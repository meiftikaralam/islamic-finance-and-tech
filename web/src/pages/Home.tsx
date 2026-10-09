import { Link } from "react-router-dom";
import { loadDocs } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const POST_URL: Record<string, string> = {
  "sukuk-guide": "/lab/sukuk-guide.html",
  "shariah-etf-guide": "/lab/shariah-etf-guide.html",
  "ai-persona-stock-analysis": "/lab/ai-persona-stock-analysis.html",
  "zoya-finance-api": "/lab/zoya-finance-api.html",
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Homepage: the Posts list. */
export function Home() {
  const posts = loadDocs("posts");
  return (
    <div>
      <h2 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-4">
        Posts
      </h2>
      <div className="space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} to={POST_URL[p.slug] ?? `/lab/${p.slug}.html`} className="no-underline block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-[13px] text-[#888]">{fmtDate(p.frontmatter.date)}</div>
                <CardTitle className="text-[17px] text-[#222]">{p.frontmatter.title}</CardTitle>
                <CardDescription>{p.frontmatter.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
