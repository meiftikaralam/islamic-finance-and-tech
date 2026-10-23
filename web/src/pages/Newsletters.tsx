import { Link } from "react-router-dom";
import { loadDocs } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Daily Newsletters archive + email subscribe box. */
export function Newsletters() {
  const editions = loadDocs("editions");
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-4">
        Daily Newsletters
      </h1>
      <div className="space-y-4">
        {editions.map((e) => (
          <Link key={e.slug} to={`/editions/${e.slug}.html`} className="no-underline block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-[13px] text-[#888]">{fmtDate(e.frontmatter.date)}</div>
                <CardTitle className="text-[17px] text-[#222]">{e.frontmatter.title}</CardTitle>
                <CardDescription>{e.frontmatter.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
