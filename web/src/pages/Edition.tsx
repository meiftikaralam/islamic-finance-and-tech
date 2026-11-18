import { Link } from "react-router-dom";
import { loadDoc } from "@/lib/content";
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

/** One newsletter edition, rendered from its markdown file. */
export function Edition({ slug }: { slug: string }) {
  const doc = loadDoc("editions", slug);
  if (!doc) return <NotFound />;
  const { headline } = deriveHeadline(doc.frontmatter.description);
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
    </article>
  );
}
