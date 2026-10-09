import { Link } from "react-router-dom";
import { loadDocs } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-4">
        Daily Newsletters
      </h2>
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

      <div className="mt-10 bg-white border border-[#e3e3e3] rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Get the Daily Brief by email</h3>
        <p className="text-sm text-[#666] mb-4">
          One short email each morning. Educational only — never investment advice.
        </p>
        <form
          action="https://app.kit.com/forms/10015197/subscriptions"
          method="post"
          className="flex gap-2 justify-center flex-wrap"
        >
          <Input
            type="email"
            name="email_address"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            className="max-w-[280px]"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </div>
  );
}
