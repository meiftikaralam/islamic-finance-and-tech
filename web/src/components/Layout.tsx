import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE_NAME, TAGLINE, DISCLAIMER, activeNav } from "@/lib/site";
import { SearchBox } from "@/components/SearchBox";
import { cn } from "@/lib/utils";

const LOGO_URL = "/islamic-finance-and-tech/logo.webp";

function BrandBar() {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8e8e8]">
      <div className="max-w-[720px] mx-auto px-4 py-2.5 flex items-center gap-3">
        <Link to="/" aria-label="Islamic Finance and Technology — home" className="shrink-0">
          <img src={LOGO_URL} alt="" className="h-10 w-10" />
        </Link>
        <div className="min-w-0">
          <p className="m-0 text-[17px] font-bold text-brand-700 leading-tight tracking-tight">
            <Link to="/" className="no-underline text-inherit">
              {SITE_NAME}
            </Link>
          </p>
          <p className="m-0 text-xs text-[#666] leading-snug">{TAGLINE}</p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  return (
    <div className="max-w-[720px] mx-auto px-4">
      <nav
        className="flex gap-5 overflow-x-auto whitespace-nowrap py-3 text-sm"
        aria-label="Main navigation"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={cn(
              "text-brand-700 no-underline shrink-0",
              active === l.match && "font-bold text-orange-600"
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <SearchBox />
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-center text-xs text-[#888] mt-10">
      {SITE_NAME} · {DISCLAIMER}
    </footer>
  );
}

/** Shared page chrome: sticky brand bar, nav, search, footer. */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BrandBar />
      <div className="max-w-[720px] mx-auto px-4 pb-12">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
