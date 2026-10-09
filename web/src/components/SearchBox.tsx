import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import searchIndex from "@/generated/search.json";

type Hit = { title: string; url: string; type: string; excerpt: string };

const INDEX = searchIndex as Hit[];

/** Site-wide search box with a results dropdown. */
export function SearchBox() {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const hits =
    query.length < 2
      ? []
      : INDEX.filter((e) => (e.title + " " + e.excerpt).toLowerCase().includes(query)).slice(0, 8);

  return (
    <div className="text-center pt-3.5">
      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search posts, companies, topics…"
        aria-label="Search the site"
        autoComplete="off"
        className="max-w-[420px] mx-auto"
      />
      {query.length >= 2 && (
        <div className="max-w-[420px] mx-auto mt-2 text-left">
          {hits.length === 0 ? (
            <div className="text-[13px] text-[#888]">No matches.</div>
          ) : (
            hits.map((h) => (
              <Link
                key={h.url}
                to={h.url}
                className="block bg-white border border-[#e3e3e3] rounded-lg px-3 py-2.5 mb-1.5 no-underline"
              >
                <span className="block text-xs text-brand-600 font-semibold">{h.type}</span>
                <span className="block text-sm font-semibold text-[#222]">{h.title}</span>
                <span className="block text-xs text-[#666]">{h.excerpt}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
