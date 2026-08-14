import { writeFileSync } from "node:fs";

import type { Fingerprint } from "./fingerprint.ts";

export type Severity = "high" | "medium" | "info";

export interface Finding {
  route: string;
  severity: Severity;
  title: string;
  detail: string;
  screenshot?: string;
}

export interface Summary {
  high: number;
  medium: number;
  info: number;
  total: number;
  changedRoutes: number;
  added: number;
  removed: number;
}

export interface ReportMeta {
  before: string;
  beforeSha: string;
  after: string;
  afterSha: string;
}

export function normalizeRoute(href: string): string | null {
  if (!href || !href.startsWith("/") || href.startsWith("//")) return null;
  return href.replace(/\/+$/, "") || "/";
}

interface DiffSnippet {
  oldSnippet: string;
  newSnippet: string;
}

function firstDiff(oldText: string, newText: string, width = 120): DiffSnippet | null {
  if (oldText === newText) return null;
  let i = 0;
  const max = Math.min(oldText.length, newText.length);
  while (i < max && oldText[i] === newText[i]) i++;
  const from = Math.max(0, i - 50);
  return {
    oldSnippet: `${from > 0 ? "…" : ""}${oldText.slice(from, from + width)}`,
    newSnippet: `${from > 0 ? "…" : ""}${newText.slice(from, from + width)}`,
  };
}

export function compareFingerprints(
  route: string,
  oldFp: Fingerprint | undefined,
  newFp: Fingerprint | undefined,
  oldRoutes: string[],
  newRoutes: string[],
): Finding[] {
  const findings: Finding[] = [];
  const pushFinding = (severity: Severity, title: string, detail: string) =>
    findings.push({ route, severity, title, detail });

  if (oldFp && "error" in oldFp) {
    pushFinding("medium", "before failed to render", oldFp.error);
    return findings;
  }
  if (newFp && "error" in newFp) {
    pushFinding("high", "after failed to render", newFp.error);
    return findings;
  }
  if (!oldFp || !newFp) return findings;

  if (newFp.title !== oldFp.title)
    pushFinding("medium", "title changed", `"${oldFp.title}" → "${newFp.title}"`);
  if (newFp.h1 !== oldFp.h1) pushFinding("medium", "h1 changed", `"${oldFp.h1}" → "${newFp.h1}"`);

  if (newFp.text !== oldFp.text) {
    const snippet = firstDiff(oldFp.text, newFp.text);
    pushFinding(
      "medium",
      "body text changed",
      snippet ? `before: ${snippet.oldSnippet}\n          after:  ${snippet.newSnippet}` : "",
    );
  }

  const removedLinks = oldFp.links.filter((l) => !newFp.links.includes(l));
  const addedLinks = newFp.links.filter((l) => !oldFp.links.includes(l));
  if (removedLinks.length) pushFinding("medium", "links removed", removedLinks.join(", "));
  if (addedLinks.length) pushFinding("info", "links added", addedLinks.join(", "));

  const newRouteSet = new Set(newRoutes.map(normalizeRoute).filter(Boolean));
  const broken = removedLinks.filter((l) => {
    const normalized = normalizeRoute(l);
    return normalized !== null && !newRouteSet.has(normalized);
  });
  if (broken.length) pushFinding("high", "broken links", broken.join(", "));

  const removedImages = oldFp.images.filter((img) => !newFp.images.some((n) => n.src === img.src));
  const addedImages = newFp.images.filter((img) => !oldFp.images.some((n) => n.src === img.src));
  for (const img of removedImages)
    pushFinding(
      "high",
      "image removed or missing",
      `${img.src}${img.alt ? ` ("${img.alt}")` : ""}`,
    );
  for (const img of addedImages)
    pushFinding("info", "image added", `${img.src}${img.alt ? ` ("${img.alt}")` : ""}`);

  const styleProps = new Set([...Object.keys(oldFp.bodyStyle), ...Object.keys(newFp.bodyStyle)]);
  for (const prop of styleProps) {
    const key = prop as keyof typeof oldFp.bodyStyle;
    if (oldFp.bodyStyle[key] !== newFp.bodyStyle[key])
      pushFinding(
        "medium",
        `body ${prop} changed`,
        `${oldFp.bodyStyle[key]} → ${newFp.bodyStyle[key]}`,
      );
  }

  const oldOverflow = oldFp.overflow.scrollWidth > oldFp.overflow.clientWidth;
  const newOverflow = newFp.overflow.scrollWidth > newFp.overflow.clientWidth;
  if (newOverflow && !oldOverflow)
    pushFinding(
      "high",
      "horizontal overflow introduced",
      `${newFp.overflow.scrollWidth}px > ${newFp.overflow.clientWidth}px viewport`,
    );
  else if (newOverflow && oldOverflow)
    pushFinding(
      "medium",
      "horizontal overflow persists",
      `${newFp.overflow.scrollWidth}px > ${newFp.overflow.clientWidth}px viewport`,
    );
  else if (!newOverflow && oldOverflow) pushFinding("info", "horizontal overflow fixed", "");

  const oldC = oldFp.contrast;
  const newC = newFp.contrast;
  if (newC.error) pushFinding("medium", "contrast check errored", newC.error);
  const oldFailSelectors = new Set(oldC.failures.map((f) => f.selector));
  const addedFailures = newC.failures.filter((f) => !oldFailSelectors.has(f.selector));
  const removedFailures = oldC.failures.filter(
    (f) => !newC.failures.some((n) => n.selector === f.selector),
  );
  if (newC.failCount > oldC.failCount)
    pushFinding(
      "high",
      "color contrast failures increased",
      `${oldC.failCount} → ${newC.failCount}`,
    );
  else if (newC.failCount < oldC.failCount)
    pushFinding(
      "info",
      "color contrast failures decreased",
      `${oldC.failCount} → ${newC.failCount}`,
    );
  for (const f of addedFailures)
    pushFinding(
      "high",
      "new color contrast failure",
      `${f.selector} (ratio ${f.ratio === null ? "?" : f.ratio.toFixed(2)})`,
    );
  for (const f of removedFailures)
    pushFinding("info", "color contrast failure resolved", f.selector);
  if (oldC.failCount === newC.failCount && oldC.failCount > 0 && oldC.minRatio !== newC.minRatio)
    pushFinding(
      "medium",
      "worst contrast ratio changed",
      `${oldC.minRatio === null ? "?" : oldC.minRatio.toFixed(2)} → ${newC.minRatio === null ? "?" : newC.minRatio.toFixed(2)}`,
    );

  return findings;
}

export function diffRoutes(
  routes: string[],
  oldFp: Record<string, Fingerprint>,
  newFp: Record<string, Fingerprint>,
  oldRoutes: string[],
  newRoutes: string[],
): { findings: Finding[]; added: number; removed: number } {
  const findings: Finding[] = [];
  let addedCount = 0;
  let removedCount = 0;
  for (const route of routes) {
    if (!newRoutes.includes(route)) {
      removedCount++;
      findings.push({
        route,
        severity: "high",
        title: "page removed",
        detail: `${route} exists before but not after`,
      });
      continue;
    }
    if (!oldRoutes.includes(route)) {
      addedCount++;
      findings.push({
        route,
        severity: "info",
        title: "page added",
        detail: "",
      });
      continue;
    }
    const pageFindings = compareFingerprints(
      route,
      oldFp[route],
      newFp[route],
      oldRoutes,
      newRoutes,
    );
    for (const f of pageFindings) {
      const newRoute = newFp[route];
      if (newRoute && "screenshot" in newRoute && newRoute.screenshot) {
        f.screenshot = newRoute.screenshot;
      }
    }
    findings.push(...pageFindings);
  }
  return { findings, added: addedCount, removed: removedCount };
}

export function summarize(
  findings: Finding[],
  total: number,
  addedCount: number,
  removedCount: number,
): Summary {
  const counts: Record<Severity, number> = { high: 0, medium: 0, info: 0 };
  for (const f of findings) counts[f.severity]++;
  return {
    ...counts,
    total,
    changedRoutes: new Set(findings.map((f) => f.route)).size,
    added: addedCount,
    removed: removedCount,
  };
}

export function writeMarkdownReport({
  outFile,
  meta,
  summary,
  findings,
}: {
  outFile: string;
  meta: ReportMeta;
  summary: Summary;
  findings: Finding[];
}) {
  const bySeverity = (sev: Severity) =>
    findings.filter((f) => f.severity === sev).sort((a, b) => a.route.localeCompare(b.route));

  const lines: string[] = [];
  const refLabel = (label: string, sha: string) =>
    sha === "existing-dist" ? label : `${label} @ \`${sha.slice(0, 8)}\``;
  lines.push(`# Upgrade comparison`);
  lines.push("");
  lines.push(`**Before:** \`${refLabel(meta.before, meta.beforeSha)}\``);
  lines.push(`**After:** \`${refLabel(meta.after, meta.afterSha)}\``);
  lines.push("");
  lines.push(`- Pages compared: ${summary.total}`);
  lines.push(`- Changed: ${summary.changedRoutes}`);
  lines.push(`- Added: ${summary.added} | Removed: ${summary.removed}`);
  lines.push(`- Findings: ${summary.high} high, ${summary.medium} medium, ${summary.info} info`);
  lines.push("");

  for (const sev of ["high", "medium", "info"] as const) {
    const items = bySeverity(sev);
    lines.push(`## ${sev.toUpperCase()} (${items.length})`);
    lines.push("");
    if (!items.length) {
      lines.push("_none_");
      lines.push("");
      continue;
    }
    for (const f of items) {
      lines.push(`- **${f.route}** — ${f.title}`);
      if (f.detail) lines.push(`\n  ${f.detail.split("\n").join("\n  ")}`);
    }
    lines.push("");
  }

  lines.push(`## Page details`);
  lines.push("");
  for (const route of [...new Set(findings.map((f) => f.route))].sort()) {
    const pageFindings = findings.filter((f) => f.route === route);
    lines.push(`### ${route}`);
    lines.push("");
    for (const f of pageFindings) {
      lines.push(
        `- **[${f.severity}]** ${f.title}${f.detail ? ` — ${f.detail.split("\n").join(" ")}` : ""}`,
      );
    }
    lines.push("");
  }

  writeFileSync(outFile, lines.join("\n"));
}

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function writeHtmlReport({
  outFile,
  meta,
  summary,
  findings,
}: {
  outFile: string;
  meta: ReportMeta;
  summary: Summary;
  findings: Finding[];
}) {
  const cards = [...new Set(findings.map((f) => f.route))].sort();
  const pageCards = cards
    .map((route) => {
      const pageFindings = findings.filter((f) => f.route === route);
      const screenshot = pageFindings.find((f) => f.screenshot);
      const imagePair = screenshot
        ? `<div class="pair">
        <figure><figcaption>before</figcaption><img src="screenshots/old/${escapeHtml(screenshot.screenshot ?? "")}" /></figure>
        <figure><figcaption>after</figcaption><img src="screenshots/new/${escapeHtml(screenshot.screenshot ?? "")}" /></figure>
      </div>`
        : "";
      const items = pageFindings
        .map(
          (f) =>
            `<li class="sev-${f.severity}"><strong>${f.severity}</strong> ${escapeHtml(f.title)}${f.detail ? ` — <code>${escapeHtml(f.detail)}</code>` : ""}</li>`,
        )
        .join("\n");
      return `<section class="card">
      <h3>${escapeHtml(route)}</h3>
      <ul>${items}</ul>
      ${imagePair}
    </section>`;
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Upgrade comparison report</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; max-width: 1100px; margin: 2rem auto; padding: 0 1rem; color: #1a1a1a; }
  h1 { margin-bottom: 0.25rem; }
  .meta { color: #666; }
  .stats { display: flex; gap: 1.5rem; margin: 1rem 0; }
  .stats div { background: #f5f5f5; border-radius: 8px; padding: 0.75rem 1rem; }
  .stats b { font-size: 1.25rem; display: block; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; }
  .card h3 { margin-top: 0; }
  ul { padding-left: 1.25rem; }
  li { margin: 0.35rem 0; }
  .sev-high { color: #b00020; }
  .sev-medium { color: #8a5a00; }
  .sev-info { color: #0a6b2f; }
  .pair { display: flex; gap: 1rem; flex-wrap: wrap; }
  .pair figure { margin: 0.5rem 0; flex: 1 1 45%; min-width: 320px; }
  .pair img { width: 100%; border: 1px solid #ddd; border-radius: 4px; }
  .pair figcaption { font-size: 0.8rem; color: #666; margin-bottom: 0.25rem; }
</style>
</head>
<body>
  <h1>Upgrade comparison</h1>
  <p class="meta">Before: <code>${escapeHtml(meta.beforeSha === "existing-dist" ? meta.before : `${meta.before}@${meta.beforeSha.slice(0, 8)}`)}</code> &middot; After: <code>${escapeHtml(meta.afterSha === "existing-dist" ? meta.after : `${meta.after}@${meta.afterSha.slice(0, 8)}`)}</code></p>
  <div class="stats">
    <div><b>${summary.total}</b> pages compared</div>
    <div><b>${summary.changedRoutes}</b> changed</div>
    <div><b>${summary.added}</b> added</div>
    <div><b>${summary.removed}</b> removed</div>
    <div><b>${summary.high}</b> high</div>
    <div><b>${summary.medium}</b> medium</div>
  </div>
  ${pageCards || "<p>No differences found.</p>"}
</body>
</html>`;
  writeFileSync(outFile, html);
}
