import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routes from "@/generated/routes.json";
import { SITE_URL } from "@/lib/site";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) return;
  el.setAttribute(attr, value);
}

/** Keeps <title> and meta tags in sync when navigating client-side. */
export function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const r = (routes as { path: string; title: string; description: string }[]).find(
      (x) => x.path === pathname
    );
    if (!r) return;
    document.title = r.title;
    const url = SITE_URL + r.path;
    setMeta('meta[name="description"]', "content", r.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", r.title);
    setMeta('meta[property="og:description"]', "content", r.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", r.title);
    setMeta('meta[name="twitter:description"]', "content", r.description);
  }, [pathname]);
}
