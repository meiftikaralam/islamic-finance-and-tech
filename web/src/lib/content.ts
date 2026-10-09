import matter from "gray-matter";
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

const contentFiles = import.meta.glob("../../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const standardFiles = import.meta.glob("../../../aaoifi-educational-kb/standards/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function toDoc(path: string, text: string): Doc {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, content } = matter(text);
  return { slug, frontmatter: data as Frontmatter, body: content };
}

function byDateDesc(a: Doc, b: Doc) {
  return (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? "");
}

/** Markdown docs under content/<kind>/, newest first. */
export function loadDocs(kind: "editions" | "posts" | "pages"): Doc[] {
  return Object.entries(contentFiles)
    .filter(([p]) => p.includes(`/content/${kind}/`))
    .map(([p, t]) => toDoc(p, t))
    .sort(byDateDesc);
}

export function loadDoc(kind: "editions" | "posts" | "pages", slug: string): Doc | undefined {
  return loadDocs(kind).find((d) => d.slug === slug);
}

/** All 62 AAOIFI Shariah Standards, in standard order. */
export function loadStandards(): Doc[] {
  return Object.entries(standardFiles)
    .map(([p, t]) => toDoc(p, t))
    .sort((a, b) => (a.frontmatter.ss ?? 0) - (b.frontmatter.ss ?? 0));
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
