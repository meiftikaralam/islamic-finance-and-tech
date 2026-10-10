#!/usr/bin/env node
// Site tests: run after `npm run ssg`. Fails loudly on any problem.
// Usage: npm test
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = new URL("..", import.meta.url).pathname; // web/
const DIST = join(ROOT, "dist");
let failures = 0;
const fail = (msg) => { failures++; console.error("FAIL:", msg); };
const ok = (msg) => console.log("ok:", msg);

// 1. typecheck
try {
  execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" });
  ok("typecheck");
} catch { fail("tsc --noEmit failed"); }

// 2. every route prerendered
const routes = JSON.parse(readFileSync(join(ROOT, "src", "generated", "routes.json"), "utf-8"));
const missing = routes.filter((r) => {
  const f = r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.slice(1));
  return !existsSync(f);
});
if (missing.length) fail(`${missing.length} routes missing from dist: ${missing.slice(0, 3).map((r) => r.path).join(", ")}`);
else ok(`${routes.length} routes prerendered`);

// 3. per-page SEO/content checks
const DISCLAIMER_SNIPPET = "not investment advice";
let checked = 0;
for (const r of routes) {
  const f = r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.slice(1));
  if (!existsSync(f)) continue;
  const html = readFileSync(f, "utf-8");
  checked++;
  if (!html.includes(`<title>${r.title}</title>`)) fail(`${r.path}: title mismatch`);
  if (!html.includes('name="description"')) fail(`${r.path}: no meta description`);
  if (!html.includes('rel="canonical"')) fail(`${r.path}: no canonical`);
  if (!html.includes("application/ld+json")) fail(`${r.path}: no JSON-LD`);
  if (!html.includes(DISCLAIMER_SNIPPET)) fail(`${r.path}: disclaimer missing from footer`);
  if (/undefined|NaN/.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) fail(`${r.path}: leaked undefined/NaN in markup`);
}
ok(`${checked} pages pass head + disclaimer checks`);

// 4. no broken internal links
const distFiles = new Set();
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else distFiles.add(p.slice(DIST.length));
  }
};
walk(DIST);
const broken = new Set();
for (const r of routes) {
  const f = r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.slice(1));
  if (!existsSync(f)) continue;
  const html = readFileSync(f, "utf-8");
  for (const m of html.matchAll(/href="(\/[^"#"]*)"/g)) {
    let href = m[1];
    if (href.startsWith("/assets/")) continue; // hashed bundle, exists check below
    const target = href === "/" ? "/index.html" : href;
    if (!distFiles.has(target)) broken.add(`${r.path} -> ${href}`);
  }
}
if (broken.size) fail(`broken internal links:\n  ${[...broken].slice(0, 10).join("\n  ")}`);
else ok("no broken internal links");

// 5. assets referenced exist
{
  const html = readFileSync(join(DIST, "index.html"), "utf-8");
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
  const missingAssets = assets.filter((a) => !distFiles.has(a));
  if (missingAssets.length) fail(`missing assets: ${missingAssets.join(", ")}`);
  else ok(`${assets.length} asset references resolve`);
}

// 6. search.json + sitemap.xml + robots.txt + llms.txt
for (const f of ["search.json", "sitemap.xml", "robots.txt", "llms.txt", ".nojekyll"]) {
  if (!existsSync(join(DIST, f))) fail(`dist/${f} missing`);
}
try {
  const sj = JSON.parse(readFileSync(join(DIST, "search.json"), "utf-8"));
  if (sj.length < 90) fail(`search.json suspiciously small: ${sj.length}`);
  else ok(`search.json: ${sj.length} entries`);
} catch { fail("search.json invalid JSON"); }

// 6b. root-domain safety: the site is served from the domain root
// (custom domain). No href/src may still point at the old
// /islamic-finance-and-tech/ subpath.
{
  let bad = 0;
  for (const r of routes) {
    const f = r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.slice(1));
    if (!existsSync(f)) continue;
    const html = readFileSync(f, "utf-8");
    for (const m of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      const v = m[1];
      if (!v.includes("islamic-finance-and-tech")) continue;
      if (v.startsWith("http") && v.includes("github.com/meiftikaralam/islamic-finance-and-tech")) continue;
      bad++;
      if (bad <= 5) fail(`${r.path}: stale subpath link ${v}`);
    }
  }
  if (bad === 0) ok("no links use the old /islamic-finance-and-tech/ subpath");
}

// 6c. client bundle must not use Node-only globals (Buffer, process, require).
// gray-matter pulled in Buffer and blanked every markdown page on hydration.
{
  const jsFiles = [];
  const walkJs = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walkJs(p);
      else if (e.name.endsWith(".js")) jsFiles.push(p.slice(DIST.length));
    }
  };
  walkJs(join(DIST, "assets"));
  let bad = 0;
  for (const f of jsFiles) {
    const code = readFileSync(join(DIST, f), "utf-8");
    for (const g of ["Buffer=", "Buffer(", "process.env"]) {
      if (code.includes(g)) { bad++; fail(`client bundle ${f} uses Node-only ${g}`); break; }
    }
  }
  if (bad === 0) ok("client bundle has no Node-only globals");
}

// 7. legacy URLs preserved (spot check)
for (const u of ["/editions/2026-10-08.html", "/lab/sukuk-guide.html", "/aaoifi/index.html", "/glossary/index.html", "/newsletters.html", "/about.html", "/playbook/index.html"]) {
  if (!existsSync(join(DIST, u.slice(1)))) fail(`legacy URL missing: ${u}`);
}
ok("legacy URLs preserved");

console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
