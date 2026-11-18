import { Link } from "react-router-dom";
import { loadDocs, loadStandards, glossaryEntries } from "@/lib/content";
import { deriveHeadline } from "@/lib/headline";

const CARD =
  "bg-white border border-[#E9E0CE] rounded-2xl p-5 mb-5 shadow-[0_1px_3px_rgba(60,45,10,0.06)]";
const CARD_LABEL = "text-[13px] font-bold tracking-[1.1px] text-[#8A7D68] mb-2.5";
const SIDE_LINK = "block py-[9px] border-b border-[#F0E8D5] text-[15px] font-medium text-brand-700 no-underline";
const SIDE_SUB = "block font-normal text-[#8A7D68] text-[12.5px] mt-0.5";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso?: string) {
  if (!iso) return "";
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}`;
}

/**
 * Desktop sidebar (layout B + warm-paper colours, approved 2026-11-18):
 * subscribe card, a Start here card, and the five most recent editions.
 * Rendered by Layout at lg and up; phones keep the single column.
 */
export function Sidebar() {
  const recent = loadDocs("editions").slice(0, 5);
  const standards = loadStandards().length;
  return (
    <div>
      <div className={CARD}>
        <h3 className={CARD_LABEL}>GET THE WEEKLY EMAIL</h3>
        <p className="text-[14.5px] leading-[1.55] text-[#444] mb-3">
          One email a week with the week's lessons. Free — educational only, never investment
          advice.
        </p>
        <form
          action="https://app.kit.com/forms/10015197/subscriptions"
          method="post"
          className="flex flex-col gap-2"
        >
          <input
            type="email"
            name="email_address"
            required
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-12 w-full rounded-lg border border-[#ccc] bg-white px-3.5 text-base placeholder:text-[#666] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className={CARD}>
        <h3 className={CARD_LABEL}>START HERE</h3>
        <Link to="/lab/sukuk-guide.html" className={SIDE_LINK}>
          Sukuk beginner's guide
          <span className={SIDE_SUB}>The five-section guide, start to finish</span>
        </Link>
        <Link to="/aaoifi/index.html" className={SIDE_LINK}>
          AAOIFI Standards
          <span className={SIDE_SUB}>All {standards}, in simple English</span>
        </Link>
        <Link to="/glossary/index.html" className={SIDE_LINK}>
          Glossary
          <span className={SIDE_SUB}>{glossaryEntries.length} companies and concepts</span>
        </Link>
        <Link to="/about.html" className={`${SIDE_LINK} border-b-0`}>
          About Iftikar
          <span className={SIDE_SUB}>7 years in payments, Islamic finance research</span>
        </Link>
      </div>

      <div className={CARD}>
        <h3 className={CARD_LABEL}>RECENT EDITIONS</h3>
        {recent.map((e, i) => {
          const { headline } = deriveHeadline(e.frontmatter.description);
          return (
            <Link
              key={e.slug}
              to={`/editions/${e.slug}.html`}
              className={`${SIDE_LINK} font-normal ${i === recent.length - 1 ? "border-b-0" : ""}`}
            >
              {shortDate(e.frontmatter.date)} — {headline}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
