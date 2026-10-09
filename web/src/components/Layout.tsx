import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE_NAME, TAGLINE, DISCLAIMER, activeNav } from "@/lib/site";
import { SearchBox } from "@/components/SearchBox";
import { cn } from "@/lib/utils";

const LOGO_URL = "/islamic-finance-and-tech/logo.webp";

const MAIN_LINKS = NAV_LINKS.slice(0, 2);
const MORE_LINKS = NAV_LINKS.slice(2);

function MoreMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const moreActive = MORE_LINKS.some((l) => l.match === active);
  return (
    <details
      className="relative ml-auto shrink-0"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <summary
        aria-label="More pages"
        className={cn(
          "list-none cursor-pointer p-2 -m-2 text-brand-700 [&::-webkit-details-marker]:hidden",
          moreActive && "text-orange-600"
        )}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-[#e8e8e8] bg-white shadow-lg py-2">
        {MORE_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              "block px-4 py-2.5 text-[15px] text-brand-700 no-underline",
              active === l.match && "font-bold text-orange-600"
            )}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function BrandBar() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
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
        <MoreMenu active={active} />
      </div>
    </div>
  );
}

function Header() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  return (
    <div className="max-w-[720px] mx-auto px-4">
      <nav className="flex gap-6 py-3 text-base" aria-label="Main navigation">
        {MAIN_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={cn(
              "text-brand-700 no-underline font-medium",
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
