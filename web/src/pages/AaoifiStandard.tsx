import { Link } from "react-router-dom";
import { loadStandards } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { NotFound } from "@/pages/NotFound";

/** One AAOIFI standard, rendered from its markdown summary. */
export function AaoifiStandard({ slug }: { slug: string }) {
  const standards = loadStandards();
  const idx = standards.findIndex((s) => s.slug === slug);
  if (idx === -1) return <NotFound />;
  const doc = standards[idx];
  const prev = standards[idx - 1];
  const next = standards[idx + 1];

  return (
    <article>
      <Link to="/aaoifi/index.html" className="inline-block mt-5 text-sm text-brand-600 no-underline">
        ← All 62 standards
      </Link>
      <div className="text-[13px] text-brand-600 font-semibold mt-4">
        SS {doc.frontmatter.ss}
        {doc.frontmatter.category ? ` · ${doc.frontmatter.category}` : ""}
      </div>
      <Markdown body={doc.body} />
      <nav className="flex justify-between mt-8 text-sm" aria-label="Standard navigation">
        <span>
          {prev && (
            <Link to={`/aaoifi/${prev.slug}.html`} className="text-brand-600 no-underline">
              ← SS {prev.frontmatter.ss}: {prev.frontmatter.title}
            </Link>
          )}
        </span>
        <span>
          {next && (
            <Link to={`/aaoifi/${next.slug}.html`} className="text-brand-600 no-underline">
              SS {next.frontmatter.ss}: {next.frontmatter.title} →
            </Link>
          )}
        </span>
      </nav>
    </article>
  );
}
