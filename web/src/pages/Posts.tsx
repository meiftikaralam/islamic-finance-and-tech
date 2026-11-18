import { Link } from "react-router-dom";
import { loadDocs } from "@/lib/content";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const GUIDE_SLUGS = new Set(["sukuk-guide", "shariah-etf-guide"]);

/** All posts (essays, experiments and beginner guides), newest first. */
export function Posts() {
  const posts = [...loadDocs("posts")].sort((a, b) =>
    (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? "")
  );
  return (
    <div>
      <h1 className="text-[28px] leading-[1.2] font-bold text-brand-700 mt-8 mb-3">
        Posts
      </h1>
      <p className="text-base leading-[1.65] text-neutral-600 mb-6">
        Essays, experiments and beginner guides on Islamic finance and the technology behind
        it, in simple words. {posts.length} posts so far, newest first.
      </p>
      {posts.map((p) => (
        <div key={p.slug} className="py-4 border-b border-neutral-200">
          <div className="text-[13px] text-neutral-500 mb-[3px]">
            {GUIDE_SLUGS.has(p.slug) ? `Guide · ${fmtDate(p.frontmatter.date)}` : fmtDate(p.frontmatter.date)}
          </div>
          <h2 className="text-[19px] font-bold leading-[1.35]">
            <Link to={`/lab/${p.slug}.html`} className="text-brand-700 no-underline">
              {p.frontmatter.title}
            </Link>
          </h2>
          <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">
            {p.frontmatter.description}
          </p>
        </div>
      ))}
    </div>
  );
}
