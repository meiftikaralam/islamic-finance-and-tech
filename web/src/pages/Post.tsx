import { Link } from "react-router-dom";
import { loadDoc } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { ArticleHead } from "@/components/ArticleHead";
import { NotFound } from "@/pages/NotFound";
import { readTimeMinutes, stripLeadingH1 } from "@/lib/headline";

/** One lab post, rendered from its markdown file. */
export function Post({ slug }: { slug: string }) {
  const doc = loadDoc("posts", slug);
  if (!doc) return <NotFound />;
  return (
    <article>
      <Link to="/" className="inline-block mt-5 text-sm text-brand-600 no-underline">
        ← All posts
      </Link>
      <ArticleHead
        headline={doc.frontmatter.title}
        date={doc.frontmatter.date}
        minutes={readTimeMinutes(doc.body)}
        label="IN THIS POST"
        summary={doc.frontmatter.description}
      />
      <Markdown body={stripLeadingH1(doc.body)} />
    </article>
  );
}
