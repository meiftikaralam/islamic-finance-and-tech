
import { loadDoc } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { NotFound } from "@/pages/NotFound";

/** Simple markdown content page (about, playbook). */
export function MdPage({ slug }: { slug: string }) {
  const doc = loadDoc("pages", slug);
  if (!doc) return <NotFound />;
  return (
    <article>
      <Markdown body={doc.body} />
    </article>
  );
}
