export const SITE_URL = "https://islamicfintech.org";
export const SITE_NAME = "Islamic Finance and Technology";
export const TAGLINE = "Tech-focused daily lessons on riba-free finance.";

// The site is served from the domain root (custom domain on GitHub Pages).
// BASENAME stays empty; withBase() keeps root-absolute paths unchanged.
export const BASENAME = "";

/** Prefix a root-absolute path ("/about.html") with the serving subpath. */
export function withBase(path: string): string {
  if (path.startsWith(BASENAME + "/") || path === BASENAME) return path;
  return BASENAME + path;
}

export const DISCLAIMER =
  "For educational purposes only — not investment advice. Nothing here is a recommendation to buy, sell, or hold any security. Iftikar is not a licensed financial advisor. AI-assisted content can contain mistakes; do your own research and consult a qualified professional before making financial decisions.";

export const NAV_LINKS = [
  { href: "/", label: "Posts", match: "posts" },
  { href: "/newsletters.html", label: "Daily Newsletters", match: "newsletters" },
  { href: "/aaoifi/index.html", label: "AAOIFI Standards", match: "aaoifi" },
  { href: "/glossary/index.html", label: "Glossary", match: "glossary" },
  { href: "/about.html", label: "About", match: "about" },
  { href: "/playbook/index.html", label: "How it's made", match: "playbook" },
] as const;

// Which nav item is active for a given path.
export function activeNav(path: string): string {
  if (path === "/" || path === "/index.html" || path.startsWith("/lab/")) return "posts";
  if (path.startsWith("/newsletters") || path.startsWith("/editions/")) return "newsletters";
  if (path.startsWith("/aaoifi")) return "aaoifi";
  if (path.startsWith("/glossary")) return "glossary";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/playbook")) return "playbook";
  return "";
}
