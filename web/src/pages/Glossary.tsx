import { useState } from "react";
import { glossaryEntries } from "@/lib/content";
import { Input } from "@/components/ui/input";

const SECTION_LABEL =
  "text-[15px] font-bold tracking-[1.2px] uppercase text-neutral-500 mt-[26px] mb-1.5";

/** Glossary: companies + concepts from the Daily Brief. */
export function Glossary() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const shown = query
    ? glossaryEntries.filter((e) =>
        (e.name + " " + e.description).toLowerCase().includes(query)
      )
    : glossaryEntries;

  const companies = shown.filter((e) => e.type === "company");
  const concepts = shown.filter((e) => e.type === "concept");

  const renderEntry = (e: (typeof glossaryEntries)[number]) => (
    <div key={e.name} className="py-4 border-b border-neutral-200">
      <h3 className="text-[17px] font-semibold leading-[1.35] text-[#222]">{e.name}</h3>
      <p className="mt-0.5 text-[15px] leading-[1.55] text-neutral-600">{e.description}</p>
      {(e.website || e.sources?.length > 0) && (
        <div className="text-[13px] text-[#666] mt-1.5">
          {e.website && (
            <a
              href={e.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline"
            >
              Official website
            </a>
          )}
          {e.sources?.length > 0 && (
            <span>
              {e.website && " · "}
              Sources:{" "}
              {e.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                    {s.label}
                  </a>
                </span>
              ))}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-[28px] leading-[1.2] font-bold text-brand-700 mt-8 mb-3">
        Glossary
      </h1>
      <p className="text-base leading-[1.65] text-neutral-600 mb-6">
        Companies and concepts from the Daily Brief, explained simply. {glossaryEntries.length}{" "}
        entries so far, and the list grows with each new edition.
      </p>
      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter the glossary…"
        aria-label="Filter glossary"
        className="max-w-[420px] mb-2"
      />

      {companies.length > 0 && (
        <>
          <h2 className={SECTION_LABEL}>Companies</h2>
          <div>{companies.map(renderEntry)}</div>
        </>
      )}
      {concepts.length > 0 && (
        <>
          <h2 className={SECTION_LABEL}>Concepts</h2>
          <div>{concepts.map(renderEntry)}</div>
        </>
      )}
      {shown.length === 0 && <p className="text-sm text-[#666] mt-4">No entries match.</p>}
    </div>
  );
}
