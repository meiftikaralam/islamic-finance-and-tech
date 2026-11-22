function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Article header (approved 2026-11-17): headline H1, byline with read time,
 * and a summary box — the NN/g pattern of a summary before the body.
 */
export function ArticleHead({
  headline,
  date,
  minutes,
  label,
  summary,
}: {
  headline: string;
  date?: string;
  minutes: number;
  label: string;
  summary: string;
}) {
  return (
    <>
      <h1 className="text-[34px] leading-[1.25] font-bold text-brand-700 mt-4 mb-3">
        {headline}
      </h1>
      <p className="text-sm text-neutral-500 mb-1">
        By <span className="font-semibold text-brand-700">Iftikar</span> · {fmtDate(date)} ·{" "}
        {minutes} min read
      </p>
      <p className="text-[13px] text-neutral-500 mb-5">
        7 years in payment software · years of Islamic finance research
      </p>
      <div className="bg-brand-50 border border-brand-100 rounded-xl px-[18px] py-4 mb-6">
        <div className="text-xs font-bold tracking-[1px] text-brand-600 mb-1.5">{label}</div>
        <p className="font-serif text-[17px] leading-[1.6] text-neutral-800">{summary}</p>
      </div>
    </>
  );
}
