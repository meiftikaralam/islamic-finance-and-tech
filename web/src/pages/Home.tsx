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
      <h1 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-4">
        Islamic Finance Blog
      </h1>
      <div className="my-6 text-center">
        <p className="text-[15px] text-[#333] mb-3">
          Get new lessons and editions by email. Free — educational only, never investment advice.
        </p>
        <form
          action="https://app.kit.com/forms/10015197/subscriptions"
          method="post"
          className="flex gap-2 justify-center max-w-[480px] mx-auto"
        >
          <input
            type="email"
            name="email_address"
            required
            placeholder="Enter your email"
            aria-label="Email address"
            className="flex-1 min-w-0 h-12 rounded-lg border border-[#ccc] bg-white px-3.5 text-base placeholder:text-[#666] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          <button
            type="submit"
            className="h-12 px-5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700"
          >
            Subscribe
          </button>
        </form>
      </div>
      <p className="text-[15px] leading-relaxed text-[#333] mb-6">
        Daily lessons on Islamic finance and the technology behind it, in simple words.
        The <Link to="/newsletters.html" className="text-brand-600 underline">daily Islamic finance newsletter</Link> covers
        Islamic banking, sukuk, halal investing and fintech, with one concept explained in each edition.
        The site also carries a <Link to="/glossary/index.html" className="text-brand-600 underline">glossary of Islamic finance terms</Link> and
        the <Link to="/aaoifi/index.html" className="text-brand-600 underline">AAOIFI Shariah Standards in simple English</Link>.
        Written by Iftikar. Free, and for education only.
      </p>
      <h2 className="text-lg font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mb-4">
        Posts
      </h2>
      <div className="space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} to={POST_URL[p.slug] ?? `/lab/${p.slug}.html`} className="no-underline block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-[13px] text-[#666]">{fmtDate(p.frontmatter.date)}</div>
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
