/** Helpers for turning a frontmatter description into a display headline. */

/** Strip a leading "Nov 17: " style date prefix from a description. */
export function stripDatePrefix(description: string): string {
  return description.replace(/^[A-Z][a-z]{2} \d{1,2}:\s*/, "");
}

export type DerivedHeadline = { headline: string; summary: string | null };

/** Uppercase the first letter (sentence-case a stripped description). */
export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/**
 * Derive a headline (and optional "Plus …" summary) from an edition
 * description: strip the "Mon D: " prefix, then split at the first
 * " — plus " or "; plus " marker (case-insensitive on "plus"). The part
 * before the marker is the headline; the part after becomes the summary,
 * prefixed with "Plus " and given a trailing period if it lacks one.
 * With no marker, the whole stripped description is the headline.
 */
export function deriveHeadline(description: string): DerivedHeadline {
  const rest = stripDatePrefix(description.trim());
  const m = rest.match(/\s—\splus\s+|;\s*plus\s+/i);
  if (!m || m.index === undefined) {
    return { headline: capitalize(rest), summary: null };
  }
  const headline = capitalize(rest.slice(0, m.index).trim());
  const tail = rest.slice(m.index + m[0].length).trim();
  let summary = `Plus ${tail}`;
  if (!/[.!?]$/.test(summary)) summary += ".";
  return { headline, summary };
}

/** Reading time in minutes: ceil(words / 200), minimum 1. */
export function readTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Remove a leading "# …" H1 line from a markdown body. Article pages render
 * their own H1 (derived headline / post title), so the body's H1 — the old
 * "Islamic Finance Daily Brief — …" title on editions — must not render too.
 */
export function stripLeadingH1(body: string): string {
  return body.replace(/^\s*#\s+.*(\r?\n|$)/, "");
}
