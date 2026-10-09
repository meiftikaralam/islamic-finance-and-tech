import { useState } from "react";
import { glossaryEntries } from "@/lib/content";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <Card key={e.name} className="h-full">
      <CardHeader>
        <CardTitle className="text-[15px] text-[#222]">{e.name}</CardTitle>
        <CardDescription>{e.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {e.website && (
          <a
            href={e.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-brand-600 underline"
          >
            Official website
          </a>
        )}
        {e.sources?.length > 0 && (
          <div className="text-[13px] text-[#888] mt-1">
            Sources:{" "}
            {e.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && " · "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">
                  {s.label}
                </a>
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-brand-600 border-b-2 border-brand-600 pb-1.5 mt-8 mb-2">
        Glossary
      </h2>
      <p className="text-[15px] text-[#333] leading-[1.7] mb-4">
        Companies and concepts from the Daily Brief, explained simply. This page grows with each new
        edition.
      </p>
      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter the glossary…"
        aria-label="Filter glossary"
        className="max-w-[420px] mb-6"
      />

      {companies.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-3">🏢 Companies</h3>
          <div className="grid gap-3 sm:grid-cols-2">{companies.map(renderEntry)}</div>
        </>
      )}
      {concepts.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-3">📖 Concepts</h3>
          <div className="grid gap-3 sm:grid-cols-2">{concepts.map(renderEntry)}</div>
        </>
      )}
      {shown.length === 0 && <p className="text-sm text-[#888] mt-4">No entries match.</p>}
    </div>
  );
}
