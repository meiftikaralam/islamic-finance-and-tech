import { Link } from "react-router-dom";
import { loadDoc } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { NotFound } from "@/pages/NotFound";

/** One newsletter edition, rendered from its markdown file. */
export function Edition({ slug }: { slug: string }) {
  const doc = loadDoc("editions", slug);
  if (!doc) return <NotFound />;
  return (
    <article>
      <Link to="/newsletters.html" className="inline-block mt-5 text-sm text-brand-600 no-underline">
        ← All editions
      </Link>
      <Markdown body={doc.body} />
    </article>
  );
}
