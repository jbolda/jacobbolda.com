import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";

import { action, resource } from "effection";
import type { Operation } from "effection";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "text/xml; charset=utf-8",
  ".pdf": "application/pdf",
};

function resolveFile(rootDir: string, urlPath: string): string | null {
  const base = path.resolve(rootDir);
  const clean = decodeURIComponent(urlPath);
  const full = path.resolve(base, "." + clean);
  if (full !== base && !full.startsWith(base + path.sep)) return null;

  const asFile = path.join(base, clean);
  const candidates = [asFile, path.join(asFile, "index.html"), asFile + ".html"];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export interface StaticServer {
  server: http.Server;
  url: string;
}

export function startServer(rootDir: string): Operation<StaticServer> {
  return resource(function* (provide) {
    const server = http.createServer((req, res) => {
      const urlPath = new URL(req.url ?? "/", "http://localhost").pathname;
      const file = resolveFile(rootDir, urlPath);
      if (!file) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("not found");
        return;
      }
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, {
        "content-type": MIME[ext] || "application/octet-stream",
        "cache-control": "no-store",
      });
      fs.createReadStream(file).pipe(res);
    });

    const port = yield* action<number>((resolve, reject) => {
      const onListening = () => {
        const { port } = server.address() as AddressInfo;
        resolve(port);
      };
      const onError = (error: Error) => reject(error);
      server.once("listening", onListening);
      server.once("error", onError);
      server.listen(0, "127.0.0.1");
      return () => {
        server.off("listening", onListening);
        server.off("error", onError);
      };
    });

    try {
      yield* provide({ server, url: `http://127.0.0.1:${port}` });
    } finally {
      server.close();
      server.closeAllConnections();
    }
  });
}
