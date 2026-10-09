import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE_NAME, TAGLINE, DISCLAIMER, activeNav } from "@/lib/site";
import { SearchBox } from "@/components/SearchBox";
import { cn } from "@/lib/utils";

function Header() {
  const { pathname } = useLocation();
  const active = activeNav(pathname);
  return (
    <header>
      <div className="bg-brand-600 text-brand-100 text-center px-5 py-8 rounded-b-xl">
        <h1 className="m-0 text-2xl text-white font-bold">{SITE_NAME}</h1>
        <p className="mt-2 text-sm">{TAGLINE}</p>
      </div>
      <nav className="text-center pt-4 text-sm" aria-label="Main navigation">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={cn("text-brand-600 mx-3 no-underline", active === l.match && "font-bold")}
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
