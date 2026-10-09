// Content is pre-parsed at build time (gen-routes.mjs writes content.json using
// gray-matter in Node). The browser bundle must not import gray-matter — it uses
// Node's Buffer and crashes client-side hydration, blanking the page.
import generated from "../generated/content.json";
import glossaryJson from "../../../content/glossary-data.json";

export type Frontmatter = {
  title: string;
  date?: string;
  description: string;
  type?: string;
  ss?: number;
  category?: string;
  one_line?: string;
};

export type Doc = {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
};

const content = generated as {
  editions: Doc[];
  posts: Doc[];
  pages: Doc[];
  standards: Doc[];
};

function byDateDesc(a: Doc, b: Doc) {
  return (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? "");
}

/** Markdown docs under content/<kind>/, newest first. */
export function loadDocs(kind: "editions" | "posts" | "pages"): Doc[] {
  return [...content[kind]].sort(byDateDesc);
}

export function loadDoc(kind: "editions" | "posts" | "pages", slug: string): Doc | undefined {
  return loadDocs(kind).find((d) => d.slug === slug);
}

/** All 62 AAOIFI Shariah Standards, in standard order. */
export function loadStandards(): Doc[] {
  return [...content.standards].sort((a, b) => (a.frontmatter.ss ?? 0) - (b.frontmatter.ss ?? 0));
}

export type GlossaryEntry = {
  name: string;
  type: "company" | "concept";
  website?: string;
  description: string;
  sources: { label: string; url: string }[];
  first_mentioned: string;
  edition: string;
};

export const glossaryEntries = glossaryJson as GlossaryEntry[];
