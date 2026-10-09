#!/usr/bin/env python3
"""Standard site chrome — single source of truth for header and footer.

Usage:  cd site && python3 build_chrome.py

Applies an identical banner, nav, search bar, and footer to every HTML page.
Idempotent: chrome blocks are wrapped in SITE-HEADER / SITE-FOOTER markers,
so re-running replaces them in place instead of duplicating.

Depth handling: pages one level deep (lab/, editions/, glossary/, aaoifi/,
playbook/) get a '../' prefix on internal links and on the search.json fetch,
so search results and nav work from every page.

Footer text: all pages share the same markup and styling. Edition pages use
the full standing disclaimer text (required by the newsletter's disclaimer
rule); every other page uses the short standard line.

Page-specific content (article bodies, edition source lines, glossary data)
is never touched — only the chrome blocks between the markers.
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent

NAV = [
    ("Posts", "index.html"),
    ("Daily Newsletters", "newsletters.html"),
    ("AAOIFI Standards", "aaoifi/index.html"),
    ("Glossary", "glossary/index.html"),
    ("About", "about.html"),
    ("How it's made", "playbook/index.html"),
]

# path prefix -> active nav label
ACTIVE = [
    ("lab/", "Posts"),
    ("editions/", "Daily Newsletters"),
    ("aaoifi/", "AAOIFI Standards"),
    ("glossary/", "Glossary"),
    ("playbook/", "How it's made"),
    ("newsletters.html", "Daily Newsletters"),
    ("about.html", "About"),
    ("index.html", "Posts"),
]

TAGLINE = "Educational resources for Islamic finance and the technology behind it"

FULL_DISCLAIMER = (
    "For educational purposes only \u2014 not investment advice. Nothing here is a "
    "recommendation to buy, sell, or hold any security. Iftikar is not a licensed "
    "financial advisor. AI-assisted content can contain mistakes; do your own research "
    "and consult a qualified professional before making financial decisions."
)
SHORT_FOOTER = (
    "Islamic Finance Daily Brief \u00b7 For educational purposes only "
    "\u2014 not investment advice."
)

CHROME_CSS = """\
.site-banner{background:#0f5132;color:#d1e7dd;text-align:center;padding:32px 20px;border-radius:0 0 12px 12px;}
.site-banner h1{margin:0;font-size:24px;color:#fff;}
.site-banner p{margin:8px 0 0;font-size:14px;color:#d1e7dd;}
.site-nav{text-align:center;padding:16px 0 0;font-size:14px;}
.site-nav a{color:#0f5132;margin:0 12px;text-decoration:none;}
.site-nav a.active{font-weight:bold;}
.site-search-wrap{text-align:center;padding:14px 0 0;}
.site-search-wrap input{width:100%;max-width:420px;padding:10px 14px;border:1px solid #ccc;border-radius:8px;font-size:14px;}
.site-search-results{max-width:420px;margin:8px auto 0;text-align:left;}
.site-search-hit{display:block;background:#fff;border:1px solid #e3e3e3;border-radius:8px;padding:10px 12px;margin-bottom:6px;text-decoration:none;color:inherit;}
.site-search-hit span{display:block;}
.site-search-type{font-size:12px;color:#0f5132;font-weight:600;}
.site-search-title{font-size:14px;font-weight:600;color:#222;}
.site-search-excerpt{font-size:12px;color:#666;}
.site-search-empty{font-size:13px;color:#888;}
.site-footer{text-align:center;font-size:12px;color:#888;margin-top:40px;}
.edition-sources{font-size:13px;color:#666;text-align:center;}
.page-h1{font-size:22px;color:#0f5132;text-align:center;margin:26px 0 4px;}
.page-sub{font-size:14px;color:#555;text-align:center;margin:0 0 8px;}"""

SEARCH_JS_TEMPLATE = """\
<script>
(function(){
  var PREFIX = "__PREFIX__";
  var box = document.getElementById('site-search'), res = document.getElementById('search-results');
  if(!box || !res) return;
  fetch(PREFIX + 'search.json').then(function(r){ return r.json(); }).then(function(idx){
    box.addEventListener('input', function(){
      var q = box.value.trim().toLowerCase();
      if(q.length < 2){ res.innerHTML = ''; return; }
      var hits = idx.filter(function(e){ return (e.title + ' ' + e.text).toLowerCase().indexOf(q) >= 0; }).slice(0, 8);
      res.innerHTML = hits.length ? hits.map(function(h){
        return '<a href="' + PREFIX + h.url + '" class="site-search-hit">'
          + '<span class="site-search-type">' + h.type + '</span>'
          + '<span class="site-search-title">' + h.title + '</span>'
          + '<span class="site-search-excerpt">' + h.excerpt + '</span></a>';
      }).join('') : '<div class="site-search-empty">No matches.</div>';
    });
  });
})();
</script>"""


def prefix_for(rel: str) -> str:
    return "../" if "/" in rel else ""


def active_for(rel: str) -> str:
    for key, label in ACTIVE:
        if rel == key or rel.startswith(key):
            return label
    return ""


def header_html(prefix: str, active: str) -> str:
    links = []
    for label, href in NAV:
        cls = ' class="active"' if label == active else ""
        links.append(f'    <a href="{prefix}{href}"{cls}>{label}</a>')
    nav = "<nav class=\"site-nav\">\n" + "\n".join(links) + "\n  </nav>"
    search = (
        '  <div class="site-search-wrap">\n'
        '    <input id="site-search" type="search" placeholder="Search posts, companies, topics\u2026" aria-label="Search the site" autocomplete="off">\n'
        '    <div id="search-results" class="site-search-results"></div>\n'
        "  </div>\n"
        + SEARCH_JS_TEMPLATE.replace("__PREFIX__", prefix)
    )
    return (
        "<!-- SITE-HEADER -->\n"
        '  <div class="site-banner">\n'
        "    <h1>Islamic Finance Daily Brief</h1>\n"
        f"    <p>{TAGLINE}</p>\n"
        "  </div>\n"
        f"{nav}\n"
        f"{search}"
        "<!-- /SITE-HEADER -->"
    )


def footer_html(full: bool) -> str:
    text = f"Islamic Finance Daily Brief \u00b7 {FULL_DISCLAIMER}" if full else SHORT_FOOTER
    return (
        "<!-- SITE-FOOTER -->\n"
        f'  <footer class="site-footer">{text}</footer>\n'
        "<!-- /SITE-FOOTER -->"
    )


def ensure_chrome_css(s: str) -> str:
    block = f'<style id="site-chrome">\n{CHROME_CSS}\n</style>'
    if 'id="site-chrome"' in s:
        s = re.sub(r'<style id="site-chrome">.*?</style>', block, s, flags=re.S)
    else:
        s = s.replace("</head>", block + "\n</head>", 1)
    return s


LEGACY_HEADER_RE = re.compile(
    r'<div class="(?:banner-slot|hero)"[^>]*>.*?</div>\s*'
    r"<nav.*?</nav>\s*"
    r'(?:<div style="text-align:center;padding:14px 0 0;">.*?</script>\s*)?',
    re.S,
)
MARKED_HEADER_RE = re.compile(r"<!-- SITE-HEADER -->.*?<!-- /SITE-HEADER -->", re.S)
MARKED_FOOTER_RE = re.compile(r"<!-- SITE-FOOTER -->.*?<!-- /SITE-FOOTER -->", re.S)
FOOTER_RE = re.compile(r"<footer.*?</footer>", re.S)
EDITION_SOURCES_RE = re.compile(
    r"<footer>(Sources:.*?)<br>\s*For educational purposes only.*?</footer>", re.S
)


def apply_header(s: str, rel: str) -> str:
    prefix = prefix_for(rel)
    new = header_html(prefix, active_for(rel))
    if "<!-- SITE-HEADER -->" in s:
        return MARKED_HEADER_RE.sub(new, s, count=1)
    s2, n = LEGACY_HEADER_RE.subn(new, s, count=1)
    if n == 0:
        raise RuntimeError(f"no legacy header found in {rel}")
    return s2


def apply_footer(s: str, rel: str) -> str:
    is_edition = rel.startswith("editions/")
    new = footer_html(full=is_edition)
    if "<!-- SITE-FOOTER -->" in s:
        return MARKED_FOOTER_RE.sub(new, s, count=1)
    if is_edition:
        # Keep the per-edition sources line as content; standard footer below it.
        m = EDITION_SOURCES_RE.search(s)
        if m:
            sources = (
                f'<p class="edition-sources">{m.group(1)}'
                "<br>Summaries are original; follow the links for full stories.</p>"
            )
            return EDITION_SOURCES_RE.sub(sources + "\n  " + new, s, count=1)
    s2, n = FOOTER_RE.subn(new, s, count=1)
    if n == 0:
        raise RuntimeError(f"no footer found in {rel}")
    return s2


def main() -> None:
    pages = sorted(
        str(p.relative_to(ROOT))
        for p in ROOT.rglob("*.html")
        if ".git" not in p.parts
    )
    for rel in pages:
        p = ROOT / rel
        s = p.read_text(encoding="utf-8")
        s = ensure_chrome_css(s)
        s = apply_header(s, rel)
        s = apply_footer(s, rel)
        p.write_text(s, encoding="utf-8")
        print(f"chrome: {rel} (prefix='{prefix_for(rel)}', active='{active_for(rel)}')")


if __name__ == "__main__":
    main()
