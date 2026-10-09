import { Link } from "react-router-dom";
import { loadDoc } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { NotFound } from "@/pages/NotFound";

/** One lab post, rendered from its markdown file. */
export function Post({ slug }: { slug: string }) {
  const doc = loadDoc("posts", slug);
  if (!doc) return <NotFound />;
  return (
    <article>
      <Link to="/" className="inline-block mt-5 text-sm text-brand-600 no-underline">
        ← All posts
      </Link>
      <Markdown body={doc.body} />
    </article>
  );
}
