import { Link } from "react-router-dom";
import { loadStandards } from "@/lib/content";
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
      <h1 className="text-[28px] leading-[1.2] font-bold text-brand-700 mt-8 mb-3">
        AAOIFI Standards in Simple English
      </h1>
      <p className="text-base leading-[1.65] text-neutral-600 mb-6">
        All 62 Shariah Standards, summarized so anyone can understand them. AAOIFI — the Accounting
        and Auditing Organization for Islamic Financial Institutions — writes the global rulebook
        for Islamic finance. Each summary explains one standard in plain language: what it is about,
        why it exists, its key rules, and an everyday example.
      </p>

      <div className="bg-[#f7f7f7] border border-neutral-200 rounded-xl p-4 mb-4 text-sm text-neutral-600 leading-[1.7]">
        <strong>Scope notes.</strong> SS 61 (Payment Cards) replaces SS 2, and SS 60 (Waqf) replaces
        SS 33 — both versions are kept and the replacement is noted. SS 62 (Sukuk) is an exposure
        draft, not a final standard. Summaries are for learning, not legal rulings — an
        institution's Shariah board decides real cases. Full sources are cited in each summary.
        Developers: the whole knowledge base ships as a Python package (aaoifi-educational-kb) you
        can pip-install and query.
      </div>
      <div className="bg-[#f7f7f7] border border-neutral-200 rounded-xl p-4 mb-6 text-sm text-neutral-600 leading-[1.7]">
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
        className="max-w-[420px] mb-2"
      />

      <div>
        {shown.map((s) => (
          <div key={s.slug} className="py-4 border-b border-neutral-200">
            <div className="text-[13px] text-brand-600 font-semibold mb-[3px]">
              SS {s.frontmatter.ss}
            </div>
            <h2 className="text-[19px] font-bold leading-[1.35]">
              <Link to={`/aaoifi/${s.slug}.html`} className="text-brand-700 no-underline">
                {s.frontmatter.title}
              </Link>
            </h2>
            <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">
              {s.frontmatter.one_line}
            </p>
          </div>
        ))}
      </div>
      {shown.length === 0 && <p className="text-sm text-[#666] mt-4">No standards match.</p>}
    </div>
  );
}
