import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadDocs, glossaryEntries, type Doc } from "@/lib/content";
import { deriveHeadline } from "@/lib/headline";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "Tuesday, November 17, 2026" — full date with weekday. */
function fmtFullDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Editorial order for "Most popular posts". The brief names the slugs
 * sukuk-beginners-guide / etfs-explained-shariah / tokenised-sukuk-explained /
 * halal-robo-advisors-explained; the two beginner guides actually live under
 * sukuk-guide / shariah-etf-guide, so each slot lists its candidate slugs in
 * order. Any slot that finds nothing is filled from the remaining posts so
 * the section always shows four.
 */
const POPULAR_CANDIDATES: { slugs: string[]; guide: boolean }[] = [
  { slugs: ["sukuk-beginners-guide", "sukuk-guide"], guide: true },
  { slugs: ["etfs-explained-shariah", "shariah-etf-guide"], guide: true },
  { slugs: ["tokenised-sukuk-explained"], guide: false },
  { slugs: ["halal-robo-advisors-explained", "halal-robo-advisors"], guide: false },
];

function pickPopular(posts: Doc[]): { doc: Doc; guide: boolean }[] {
  const picked: { doc: Doc; guide: boolean }[] = [];
  const used = new Set<string>();
  for (const c of POPULAR_CANDIDATES) {
    const doc = c.slugs.map((s) => posts.find((p) => p.slug === s)).find(Boolean);
    if (doc && !used.has(doc.slug)) {
      picked.push({ doc, guide: c.guide });
      used.add(doc.slug);
    }
  }
  for (const p of posts) {
    if (picked.length >= 4) break;
    if (!used.has(p.slug)) {
      picked.push({ doc: p, guide: false });
      used.add(p.slug);
    }
  }
  return picked.slice(0, 4);
}

const SECTION_LABEL = "text-[15px] font-bold tracking-[1.2px] text-[#8A7D68] mt-[26px] mb-1.5";

/**
 * Homepage — Option B2 (approved 2026-11-17): statement hero + subscribe,
 * the three latest editions as an open list, then most popular posts.
 * The whole site sits on white since the 2026-11-17 consistency pass.
 */
export function Home() {
  const editions = loadDocs("editions");
  const posts = loadDocs("posts");
  const latest = editions.slice(0, 3);
  const popular = pickPopular(posts);

  // "TODAY" marker: computed client-side after mount so the prerendered
  // HTML never disagrees with the viewer's local date (no hydration clash).
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    setToday(local);
  }, []);

  return (
    <div className="pt-11 pb-6">
      {/* Hero */}
      <h1 className="text-[34px] leading-[1.15] sm:text-[44px] sm:leading-[1.12] font-bold text-brand-700 tracking-[-0.5px]">
        Islamic finance, explained in simple words.
      </h1>
      <p className="mt-3.5 text-lg leading-[1.55] text-neutral-700 max-w-[560px]">
        A daily lesson on Islamic banking, sukuk, halal investing and the technology behind
        them. Written by Iftikar — 7 years in payments, years of Islamic finance research.
      </p>
      <form
        action="https://app.kit.com/forms/10015197/subscriptions"
        method="post"
        className="flex gap-2 max-w-[480px] mt-5"
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
          className="h-12 px-5 rounded-lg bg-[#C2410C] text-white font-semibold hover:bg-[#9A3412]"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-3 text-sm text-neutral-500">
        Free. One email a week with the week's lessons. Educational only.
      </p>

      <hr className="border-[#E9E0CE] mt-[30px]" />

      {/* Latest editions */}
      <section>
        <h2 className={SECTION_LABEL}>LATEST EDITIONS</h2>
        {latest.map((e, i) => {
          const { headline, summary } = deriveHeadline(e.frontmatter.description);
          const isToday = i === 0 && today !== null && e.frontmatter.date === today;
          return (
            <div key={e.slug} className="py-4 border-b border-[#E9E0CE]">
              <div className="text-[13px] text-neutral-500 mb-[3px]">
                {isToday && <span className="font-bold text-[#C2410C]">TODAY · </span>}
                {fmtFullDate(e.frontmatter.date)}
              </div>
              <h3 className="text-[19px] font-bold leading-[1.35]">
                <Link to={`/editions/${e.slug}.html`} className="text-brand-700 no-underline">
                  {headline}
                </Link>
              </h3>
              {summary && (
                <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">{summary}</p>
              )}
            </div>
          );
        })}
        <p className="pt-3.5 text-[15px] font-semibold">
          <Link to="/newsletters.html" className="text-brand-700 no-underline">
            All {editions.length} editions →
          </Link>
        </p>
      </section>

      {/* Most popular posts */}
      <section>
        <h2 className={SECTION_LABEL}>MOST POPULAR POSTS</h2>
        {popular.map(({ doc, guide }) => (
          <div key={doc.slug} className="py-4 border-b border-[#E9E0CE]">
            <div className="text-[13px] text-neutral-500 mb-[3px]">
              {guide ? "Guide" : `Post · ${fmtDate(doc.frontmatter.date)}`}
            </div>
            <h3 className="text-[19px] font-bold leading-[1.35]">
              <Link to={`/lab/${doc.slug}.html`} className="text-brand-700 no-underline">
                {doc.frontmatter.title}
              </Link>
            </h3>
            <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">
              {doc.frontmatter.description}
            </p>
          </div>
        ))}
        <p className="pt-3.5 text-[15px] font-semibold">
          <Link to="/posts.html" className="text-brand-700 no-underline">
            All posts →
          </Link>
        </p>
      </section>

      {/* Explore — the two reference sections, linked from home so a phone
          visitor finds them without opening the menu (UX audit fix, 2026-11-17). */}
      <section>
        <h2 className={SECTION_LABEL}>EXPLORE</h2>
        <div className="py-4 border-b border-[#E9E0CE]">
          <h3 className="text-[19px] font-bold leading-[1.35]">
            <Link to="/aaoifi/index.html" className="text-brand-700 no-underline">
              AAOIFI Standards in Simple English
            </Link>
          </h3>
          <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">
            All 62 Shariah Standards, summarized in plain language — what each one covers, its key
            rules, and an everyday example.
          </p>
        </div>
        <div className="py-4 border-b border-[#E9E0CE]">
          <h3 className="text-[19px] font-bold leading-[1.35]">
            <Link to="/glossary/index.html" className="text-brand-700 no-underline">
              Glossary
            </Link>
          </h3>
          <p className="mt-1 text-[15px] leading-[1.55] text-neutral-600">
            {glossaryEntries.length} companies and concepts from the editions, explained simply.
          </p>
        </div>
      </section>
    </div>
  );
}
