import { Link } from "react-router-dom";
import { loadDoc, loadDocs, type Doc } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { ArticleHead } from "@/components/ArticleHead";
import { NotFound } from "@/pages/NotFound";
import {
  deriveHeadline,
  stripDatePrefix,
  capitalize,
  readTimeMinutes,
  stripLeadingH1,
} from "@/lib/headline";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function EditionNavLink({ doc, kind }: { doc: Doc; kind: "previous" | "next" }) {
  const { headline } = deriveHeadline(doc.frontmatter.description);
  const isNext = kind === "next";
  return (
    <div className={isNext ? "text-right" : ""}>
      <div className="text-[12px] font-bold tracking-[1.2px] uppercase text-neutral-500 mb-1">
        {isNext ? "Next edition →" : "← Previous edition"}
      </div>
      <Link
        to={`/editions/${doc.slug}.html`}
        className="text-[15px] font-semibold leading-[1.4] text-brand-700 no-underline"
      >
        {headline}
      </Link>
      <div className="text-[13px] text-neutral-500 mt-0.5">{fmtDate(doc.frontmatter.date)}</div>
    </div>
  );
}

/** One newsletter edition, rendered from its markdown file. */
export function Edition({ slug }: { slug: string }) {
  const doc = loadDoc("editions", slug);
  if (!doc) return <NotFound />;
  const { headline } = deriveHeadline(doc.frontmatter.description);
  // Editions arrive newest first: the previous (older) edition sits one index
  // after this one, the next (newer) edition one index before it.
  const editions = loadDocs("editions");
  const idx = editions.findIndex((e) => e.slug === slug);
  const previous = idx >= 0 ? editions[idx + 1] : undefined;
  const next = idx > 0 ? editions[idx - 1] : undefined;
  return (
    <article>
      <Link to="/newsletters.html" className="inline-block mt-5 text-sm text-brand-600 no-underline">
        ← All editions
      </Link>
      <ArticleHead
        headline={headline}
        date={doc.frontmatter.date}
        minutes={readTimeMinutes(doc.body)}
        label="IN THIS EDITION"
        summary={capitalize(stripDatePrefix(doc.frontmatter.description))}
      />
      <Markdown body={stripLeadingH1(doc.body)} />
      {(previous || next) && (
        <nav
          aria-label="More editions"
          className="mt-10 border-t border-[#E9E0CE] pt-5 grid grid-cols-2 gap-4"
        >
          <div>{previous && <EditionNavLink doc={previous} kind="previous" />}</div>
          <div>{next && <EditionNavLink doc={next} kind="next" />}</div>
        </nav>
      )}
    </article>
  );
}
