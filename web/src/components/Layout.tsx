import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE_NAME, TAGLINE, DISCLAIMER, activeNav } from "@/lib/site";
import { SearchBox } from "@/components/SearchBox";
import { cn } from "@/lib/utils";

const LOGO_URL = "/islamic-finance-and-tech/logo.webp";

function Header() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  return (
    <header>
      <div className="flex items-center gap-3 px-2 pt-6 pb-1">
        <Link to="/" aria-label="Islamic Finance Daily Brief — home" className="shrink-0">
          <img src={LOGO_URL} alt="" className="h-11 w-11" />
        </Link>
        <div>
          <h1 className="m-0 text-2xl font-bold text-brand-700 leading-tight">
            <Link to="/" className="no-underline text-inherit">
              {SITE_NAME}
            </Link>
          </h1>
          <p className="m-0 text-sm text-[#666]">{TAGLINE}</p>
        </div>
      </div>
      <nav className="text-center pt-4 text-sm" aria-label="Main navigation">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={cn(
              "text-brand-700 mx-3 no-underline",
              active === l.match && "font-bold text-orange-600"
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <SearchBox />
    </header>
  );
}

function Footer() {
  return (
    <footer className="text-center text-xs text-[#888] mt-10">
      {SITE_NAME} · {DISCLAIMER}
    </footer>
  );
}

/** Shared page chrome: banner, nav, search, footer. */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[720px] mx-auto px-4 pb-12">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
