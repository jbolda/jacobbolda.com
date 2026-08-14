import path from "node:path";

import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";
import type { Page } from "playwright";

import { ensure, resource, sleep, until } from "effection";
import type { Operation } from "effection";

export interface BodyStyle {
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
}

export interface PageMeaning {
  title: string;
  h1: string | null;
  text: string;
  links: string[];
  images: { src: string | null; alt: string | null }[];
  bodyStyle: BodyStyle;
  overflow: { scrollWidth: number; clientWidth: number };
}

export interface ContrastFailure {
  selector: string;
  ratio: number | null;
}

export interface ContrastInfo {
  minRatio: number | null;
  failCount: number;
  failures: ContrastFailure[];
  error: string | null;
}

export type PageFingerprint = PageMeaning & {
  contrast: ContrastInfo;
  screenshot?: string;
};

export type Fingerprint = PageFingerprint | { error: string };

export function routeName(route: string): string {
  const cleaned = route === "/" ? "root" : route.replace(/^\//, "").replace(/\//g, "__");
  return cleaned.replace(/[^a-zA-Z0-9._-]/g, "_") || "root";
}

function* collectPage(page: Page): Operation<PageFingerprint> {
  const meaning = yield* until(
    page.evaluate((): PageMeaning => {
      const norm = (s: string | null) => (s || "").replace(/\s+/g, " ").trim();
      const body = document.body;
      const h1 = document.querySelector("h1");
      const bcs = getComputedStyle(body);
      const links = [
        ...new Set(
          [...document.querySelectorAll("a[href]")]
            .map((a) => a.getAttribute("href"))
            .filter((href): href is string => href !== null),
        ),
      ].sort();
      const images = [...document.querySelectorAll("img")].map((img) => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt"),
      }));
      return {
        title: document.title,
        h1: h1 ? norm(h1.innerText) : null,
        text: norm(body.innerText),
        links,
        images,
        bodyStyle: {
          color: bcs.color,
          backgroundColor: bcs.backgroundColor,
          fontFamily: bcs.fontFamily,
          fontSize: bcs.fontSize,
          lineHeight: bcs.lineHeight,
        },
        overflow: {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        },
      };
    }),
  );

  const contrast: ContrastInfo = {
    minRatio: null,
    failCount: 0,
    failures: [],
    error: null,
  };
  try {
    const results = yield* until(new AxeBuilder({ page }).withRules(["color-contrast"]).analyze());
    const failures: ContrastFailure[] = results.violations.flatMap((violation) =>
      violation.nodes.map((node) => ({
        selector: node.target.join(" "),
        ratio: node.any?.[0]?.data?.contrastRatio ?? node.all?.[0]?.data?.contrastRatio ?? null,
      })),
    );
    failures.sort((a, b) => a.selector.localeCompare(b.selector));
    const ratios = failures.map((f) => f.ratio).filter((r) => r !== null);
    contrast.minRatio = ratios.length ? Math.min(...ratios) : null;
    contrast.failCount = failures.length;
    contrast.failures = failures;
  } catch (error) {
    contrast.error = error instanceof Error ? error.message : String(error);
  }
  return { ...meaning, contrast };
}

export interface CollectOptions {
  baseUrl: string;
  routes: string[];
  screenshotsDir?: string;
}

export function collectFingerprints({
  baseUrl,
  routes,
  screenshotsDir,
}: CollectOptions): Operation<Record<string, Fingerprint>> {
  return resource(function* (provide) {
    const browser = yield* until(chromium.launch());
    yield* ensure(() => until(browser.close()));
    const context = yield* until(
      browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
      }),
    );
    const page = yield* until(context.newPage());
    const out: Record<string, Fingerprint> = {};

    for (const route of routes) {
      let fingerprint: PageFingerprint;
      try {
        const response = yield* until(
          page.goto(baseUrl + route, { waitUntil: "load", timeout: 30000 }),
        );
        const status = response ? response.status() : null;
        if (status !== null && status >= 400) {
          out[route] = { error: `HTTP ${status}` };
          continue;
        }
        yield* until(page.evaluate(() => document.fonts.ready));
        yield* sleep(250);
        fingerprint = yield* collectPage(page);
      } catch (error) {
        out[route] = {
          error: error instanceof Error ? error.message : String(error),
        };
        continue;
      }

      if (screenshotsDir) {
        const name = routeName(route);
        try {
          yield* until(
            page.screenshot({
              path: path.join(screenshotsDir, `${name}.png`),
              fullPage: true,
            }),
          );
          fingerprint.screenshot = `${name}.png`;
        } catch {
          // screenshot is best-effort
        }
      }
      out[route] = fingerprint;
    }

    yield* provide(out);
  });
}
