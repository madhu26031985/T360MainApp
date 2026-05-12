/**
 * Serves `dist/` like production: `/` → `/weblogin/`, SPA fallback for `/weblogin/*`.
 * Run after `npm run build:web`. Does not include Netlify serverless functions.
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const WEBLOGIN = path.join(DIST, "weblogin");
const PORT = Number(process.env.PORT) || 4173;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json; charset=utf-8",
};

function safeJoin(base, segments) {
  const resolved = path.resolve(base, ...segments);
  if (!resolved.startsWith(base)) return null;
  return resolved;
}

function tryFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return null;
  const st = fs.statSync(filePath);
  if (st.isFile()) return filePath;
  if (st.isDirectory()) {
    const idx = path.join(filePath, "index.html");
    if (fs.existsSync(idx) && fs.statSync(idx).isFile()) return idx;
  }
  return null;
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      res.writeHead(302, { Location: "/weblogin/" });
      res.end();
      return;
    }

    if (pathname === "/weblogin") {
      res.writeHead(302, { Location: "/weblogin/" });
      res.end();
      return;
    }

    if (pathname.startsWith("/.well-known/")) {
      const rel = pathname.slice("/.well-known/".length).split("/").filter((s) => s && s !== ".." && s !== ".");
      const filePath = safeJoin(path.join(DIST, ".well-known"), rel);
      const found = filePath && tryFile(filePath);
      if (found) {
        const ext = path.extname(found);
        res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
        fs.createReadStream(found).pipe(res);
        return;
      }
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    if (pathname.startsWith("/weblogin/")) {
      const rest = pathname.slice("/weblogin/".length);
      const segments = rest.split("/").filter((s) => s && s !== ".." && s !== ".");
      const base = WEBLOGIN;
      if (!fs.existsSync(base)) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(
          "dist/weblogin/ not found. Run: npm run build:web\n",
        );
        return;
      }
      let filePath = segments.length ? safeJoin(base, segments) : base;
      let found = filePath && tryFile(filePath);
      if (!found && filePath && fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        found = tryFile(path.join(filePath, "index.html"));
      }
      if (!found) {
        const spa = path.join(WEBLOGIN, "index.html");
        if (fs.existsSync(spa)) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          fs.createReadStream(spa).pipe(res);
          return;
        }
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(found);
      res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
      fs.createReadStream(found).pipe(res);
      return;
    }

    const rootSegments = pathname.split("/").filter((s) => s && s !== ".." && s !== ".");
    const rootFile = rootSegments.length ? safeJoin(DIST, rootSegments) : null;
    const foundRoot = rootFile && tryFile(rootFile);
    if (foundRoot) {
      const ext = path.extname(foundRoot);
      res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
      fs.createReadStream(foundRoot).pipe(res);
      return;
    }

    res.writeHead(404);
    res.end("Not found");
  } catch {
    res.writeHead(500);
    res.end("Error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  const base = `http://127.0.0.1:${PORT}`;
  console.log("");
  console.log(`Web preview (production-style /weblogin):`);
  console.log(`  ${base}/weblogin/`);
  console.log(`  ${base}/weblogin/t360-training-excomm-create-club`);
  console.log("");
});
