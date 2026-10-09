#!/usr/bin/env node
// Scans content/ and writes src/generated/routes.json + src/generated/search.json.
// Run: npm run gen:routes  (also runs automatically before prerender)
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, basename } from "path";
import matter from "gray-matter";

const ROOT = new URL("../..", import.meta.url).pathname;
const OUT = join(ROOT, "web", "src", "generated");
mkdirSync(OUT, { recursive: true });

const fm = (p) => matter(readFileSync(p, "utf-8")).data;
const mdFiles = (dir) => readdirSync(dir).filter((f) => f.endsWith(".md")).sort();

const routes = [];
const search = [];
const addSearch = (title, url, type, excerpt) =>
  search.push({ title, url, type, excerpt: (excerpt || "").slice(0, 160) });

// --- static pages ---
const statics = [
  ["/", "home", "Islamic Finance Daily Brief",
    "Educational resources for Islamic finance and the technology behind it. Daily newsletter, beginner guides, AAOIFI standards in simple English, and a growing glossary."],
  ["/newsletters.html", "newsletters", "Daily Newsletters — Islamic Finance Daily Brief",
    "Archive of the Islamic Finance Daily Brief: every edition with source links and plain-English explainers."],
  ["/about.html", "page", "About — Islamic Finance Daily Brief",
    "About the Islamic Finance Daily Brief — a free educational project by Iftikar."],
  ["/playbook/index.html", "page", "How it's made — Islamic Finance Daily Brief",
    "The open playbook behind the Islamic Finance Daily Brief — sources, rules, and process."],
  ["/aaoifi/index.html", "aaoifi-index", "AAOIFI Standards in Simple English",
    "All 62 AAOIFI Shariah Standards summarized in plain, simple English — free for learning, teaching, and research."],
  ["/glossary/index.html", "glossary", "Glossary — Islamic Finance Daily Brief",
    "Companies and concepts from the Daily Brief, explained simply."],
];
for (const [path, kind, title, description] of statics) {
  const slug = kind === "page" ? basename(path, ".html") === "about" ? "about" : "playbook" : undefined;
  routes.push({ path, kind, slug, title, description });
  addSearch(title, path.replace(/^\//, ""), "Page", description);
}

// --- editions ---
for (const f of mdFiles(join(ROOT, "content", "editions"))) {
  const slug = basename(f, ".md");
  const d = fm(join(ROOT, "content", "editions", f));
  routes.push({ path: `/editions/${slug}.html`, kind: "edition", slug, title: d.title, description: d.description, date: d.date });
  addSearch(d.title, `editions/${slug}.html`, "Newsletter edition", d.description);
}

// --- posts ---
const postSlugs = { "sukuk-guide": 1, "shariah-etf-guide": 1, "ai-persona-stock-analysis": 1, "zoya-finance-api": 1 };
for (const f of mdFiles(join(ROOT, "content", "posts"))) {
  const slug = basename(f, ".md");
  const d = fm(join(ROOT, "content", "posts", f));
  routes.push({ path: `/lab/${slug}.html`, kind: "post", slug, title: d.title, description: d.description, date: d.date });
  addSearch(d.title, `lab/${slug}.html`, "Post", d.description);
}

// --- AAOIFI standards (individual pages — one per standard for SEO/agents) ---
const stdDir = join(ROOT, "aaoifi-educational-kb", "standards");
for (const f of mdFiles(stdDir)) {
  const slug = basename(f, ".md");
  const d = fm(join(stdDir, f));
  const title = `SS ${d.ss}: ${d.title} — AAOIFI in Simple English`;
  const description = d.one_line || `AAOIFI Shariah Standard ${d.ss} explained in simple English.`;
  routes.push({ path: `/aaoifi/${slug}.html`, kind: "aaoifi-standard", slug, title, description, ss: d.ss });
  addSearch(title, `aaoifi/${slug}.html`, "AAOIFI Standard", description);
}

// --- glossary entries into search ---
const glossary = JSON.parse(readFileSync(join(ROOT, "content", "glossary-data.json"), "utf-8"));
for (const e of glossary) {
  const anchor = e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  addSearch(e.name, `glossary/index.html#${anchor}`, `Glossary: ${e.type}`, e.description);
}

routes.sort((a, b) => a.path.localeCompare(b.path));
writeFileSync(join(OUT, "routes.json"), JSON.stringify(routes, null, 1));
writeFileSync(join(OUT, "search.json"), JSON.stringify(search, null, 1));
console.log(`wrote ${routes.length} routes, ${search.length} search entries`);
