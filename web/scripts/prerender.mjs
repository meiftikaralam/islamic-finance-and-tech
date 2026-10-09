#!/usr/bin/env node
// Prerenders every route to static HTML (SEO: real HTML per URL for crawlers
// and agents). Run AFTER `vite build` — reads dist/index.html as the template.
// Usage: npm run prerender
import { createServer } from "vite";
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "fs";
import { join, dirname } from "path";

const ROOT = new URL("../..", import.meta.url).pathname;
const DIST = join(ROOT, "web", "dist");
const SITE_URL = "https://meiftikaralam.github.io/islamic-finance-and-tech";

const routes = JSON.parse(readFileSync(join(ROOT, "web", "src", "generated", "routes.json"), "utf-8"));

// The site is served from this subpath on GitHub Pages. The router basename
// needs the full path, so the prerender passes basename + route path.
const BASENAME = "/islamic-finance-and-tech";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function headFor(r) {
  const url = SITE_URL + r.path;
  const title = esc(r.title);
  const desc = esc(r.description);
  const isArticle = ["edition", "post", "aaoifi-standard"].includes(r.kind);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isArticle ? "Article" : "WebPage",
    headline: r.title,
    description: r.description,
    author: { "@type": "Person", name: "Iftikar" },
    publisher: { "@type": "Organization", name: "Islamic Finance and Technology" },
    ...(r.date ? { datePublished: r.date } : {}),
  };
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:type" content="${isArticle ? "article" : "website"}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${desc}">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");
}

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
const template = readFileSync(join(DIST, "index.html"), "utf-8");
// The prerender overwrites dist/index.html (the "/" route), so a second run
// without a fresh `vite build` would silently reuse a stale template.
if (!template.includes("<!-- PRERENDER-HEAD -->") || !template.includes('<div id="root"></div>')) {
  throw new Error("prerender template is stale (already prerendered?) — run `vite build` first");
}

for (const r of routes) {
  const appHtml = render(BASENAME + r.path);
  let html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);
  html = html.replace("<!-- PRERENDER-HEAD -->", headFor(r));
  const outPath = r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.slice(1));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log("prerendered", r.path);
}

// search.json for the client search box
cpSync(join(ROOT, "web", "src", "generated", "search.json"), join(DIST, "search.json"));

// robots.txt
writeFileSync(
  join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

// sitemap.xml (all routes)
const urls = routes
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>${r.date ? `\n    <lastmod>${r.date}</lastmod>` : ""}\n  </url>`)
  .join("\n");
writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

// llms.txt — helps AI agents find and cite the content quickly
const llms = [
  "# Islamic Finance and Technology",
  "",
  "> Free educational resources for Islamic finance and the technology behind it, by Iftikar. All content is educational only — not investment advice.",
  "",
  "## Content",
  "",
  ...routes
    .filter((r) => ["edition", "post", "aaoifi-standard"].includes(r.kind))
    .map((r) => `- [${r.title}](${SITE_URL}${r.path})`),
  "",
  "## Raw markdown (machine-readable)",
  "",
  "- Editions: https://github.com/meiftikaralam/islamic-finance-and-tech/tree/main/content/editions",
  "- Posts: https://github.com/meiftikaralam/islamic-finance-and-tech/tree/main/content/posts",
  "- AAOIFI standards: https://github.com/meiftikaralam/islamic-finance-and-tech/tree/main/aaoifi-educational-kb/standards",
  "",
  "## License notes",
  "",
  "- Newsletter/posts: educational use; always cite the source page.",
  "- AAOIFI summaries: CC BY-NC 4.0, non-commercial; the standards themselves are AAOIFI's intellectual property.",
  "",
].join("\n");
writeFileSync(join(DIST, "llms.txt"), llms);

// keep GitHub Pages from running Jekyll
writeFileSync(join(DIST, ".nojekyll"), "");

await server.close();
console.log(`done: ${routes.length} pages + sitemap + llms.txt`);
