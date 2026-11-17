import { Link } from "react-router-dom";
import { loadDocs, type Doc } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function monthLabel(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

type MonthGroup = {
  key: string;
  label: string;
  anchor: string;
  items: Doc[];
};

/** Editions grouped by month, newest month first (editions arrive newest first). */
function groupByMonth(editions: Doc[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const e of editions) {
    const date = e.frontmatter.date ?? "";
    const key = date.slice(0, 7);
    let g = groups.find((x) => x.key === key);
    if (!g) {
      const label = date ? monthLabel(date) : "Archive";
      g = { key, label, anchor: label.toLowerCase().replace(/\s+/g, "-"), items: [] };
      groups.push(g);
    }
    g.items.push(e);
  }
  return groups;
}

function EditionCard({ e }: { e: Doc }) {
  return (
    <Link key={e.slug} to={`/editions/${e.slug}.html`} className="no-underline block">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="text-[13px] text-[#666]">{fmtDate(e.frontmatter.date)}</div>
          <CardTitle className="text-[17px] text-[#222]">{e.frontmatter.title}</CardTitle>
          <CardDescription>{e.frontmatter.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

/**
 * Daily Newsletters archive.
 * UX rule applied: the latest edition stands out on its own dark card
 * (Von Restorff / Serial Position), month jump chips cut the choice down
 * to one tap (Hick / Fitts), and editions sit in month groups instead of
 * one long flat list (Common Region / Miller).
 */
export function Newsletters() {
  const editions = loadDocs("editions");
  const latest = editions[0];
  const groups = groupByMonth(editions);
  return (
    <div>
      <h1 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-4">
        Daily Newsletters
      </h1>
      <p className="text-[15px] leading-relaxed text-[#333] mb-6">
        The full archive of the Islamic Finance Daily Brief. A new edition every day, each one
        explaining an Islamic finance story and one concept in simple words.{" "}
        {editions.length} editions so far, newest first.
      </p>

      {latest && (
        <Link to={`/editions/${latest.slug}.html`} className="no-underline block mb-8">
          <Card className="bg-brand-700 border-brand-700 hover:shadow-md transition-shadow">
            <CardHeader>
              <div>
                <span className="inline-block bg-[#F97316] text-white text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                  Latest edition
                </span>
              </div>
              <div className="text-[13px] text-brand-100">{fmtDate(latest.frontmatter.date)}</div>
              <CardTitle className="text-[22px] leading-snug text-white">
                {latest.frontmatter.title}
              </CardTitle>
              <CardDescription className="text-[15px] leading-relaxed text-brand-100">
                {latest.frontmatter.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      )}

      <nav aria-label="Jump to a month" className="flex flex-wrap gap-2.5 mb-2">
        {groups.map((g) => (
          <a
            key={g.key}
            href={`#${g.anchor}`}
            className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-brand-600 bg-white text-brand-700 text-[15px] font-medium no-underline hover:bg-brand-50"
          >
            {g.label} · {g.items.length} {g.items.length === 1 ? "edition" : "editions"}
          </a>
        ))}
      </nav>

      {groups.map((g) => (
        <section key={g.key} className="mt-8">
          <h2
            id={g.anchor}
            className="text-lg font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mb-4 scroll-mt-20"
          >
            {g.label}
          </h2>
          <div className="space-y-4">
            {g.items.map((e) => (
              <EditionCard key={e.slug} e={e} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
