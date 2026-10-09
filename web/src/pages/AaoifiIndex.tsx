import { Link } from "react-router-dom";
import { loadStandards } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

/** AAOIFI knowledge base index: all 62 standards + legal notices. */
export function AaoifiIndex() {
  const standards = loadStandards();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const shown = query
    ? standards.filter((s) =>
        (s.frontmatter.title + " " + (s.frontmatter.one_line ?? "")).toLowerCase().includes(query)
      )
    : standards;

  return (
    <div>
      <h2 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-2">
        AAOIFI Standards in Simple English
      </h2>
      <p className="text-[15px] text-[#333] leading-[1.7] mb-4">
        All 62 Shariah Standards, summarized so anyone can understand them. AAOIFI — the Accounting
        and Auditing Organization for Islamic Financial Institutions — writes the global rulebook
        for Islamic finance. Each summary explains one standard in plain language: what it is about,
        why it exists, its key rules, and an everyday example.
      </p>

      <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 mb-4 text-sm text-[#555] leading-[1.7]">
        <strong>Scope notes.</strong> SS 61 (Payment Cards) replaces SS 2, and SS 60 (Waqf) replaces
        SS 33 — both versions are kept and the replacement is noted. SS 62 (Sukuk) is an exposure
        draft, not a final standard. Summaries are for learning, not legal rulings — an
        institution's Shariah board decides real cases. Full sources are cited in each summary.
        Developers: the whole knowledge base ships as a Python package (aaoifi-educational-kb) you
        can pip-install and query.
      </div>
      <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 mb-6 text-sm text-[#555] leading-[1.7]">
        <strong>Intellectual property.</strong> The AAOIFI Shariah Standards are the intellectual
        property of AAOIFI. These summaries are independent paraphrases written for education — not
        published by, affiliated with, or endorsed by AAOIFI. Nothing here reproduces AAOIFI's
        standard texts; readers who need the authoritative wording should consult AAOIFI's official
        publications (https://aaoifi.com). <strong>Non-commercial use.</strong> This knowledge base
        is shared under CC BY-NC 4.0 for learning, teaching, and research with attribution.
        Commercial use — including business development, paid products, or paid services built on
        this material — is not permitted.
      </div>

      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter standards…"
        aria-label="Filter AAOIFI standards"
        className="max-w-[420px] mb-4"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {shown.map((s) => (
          <Link key={s.slug} to={`/aaoifi/${s.slug}.html`} className="no-underline block">
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <div className="text-[13px] text-brand-600 font-semibold">SS {s.frontmatter.ss}</div>
                <CardTitle className="text-[15px] text-[#222]">{s.frontmatter.title}</CardTitle>
                <CardDescription>{s.frontmatter.one_line}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {shown.length === 0 && <p className="text-sm text-[#888] mt-4">No standards match.</p>}
    </div>
  );
}
