#!/usr/bin/env python3
"""Generate site/glossary/index.html from site/glossary/data.json.

data.json: list of {"name", "type" ("company"|"concept"), "website" (optional),
  "description", "sources": [{"label","url"}], "first_mentioned", "edition" (optional)}
Entries are sorted alphabetically within each section.

Run from the repo root: python3 glossary/build.py
(also runnable from site/: python3 glossary/build.py resolves paths itself)
"""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent          # site/glossary
DATA = HERE / "data.json"
OUT = HERE / "index.html"

NAV = """<nav style="text-align:center;padding:16px 0 0;font-size:14px;">
    <a href="../index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">Posts</a>
    <a href="../about.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">About</a>
    <a href="index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;font-weight:bold;">Glossary</a>
    <a href="../playbook/index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">How it's made</a>
  </nav>"""

SEARCH_BOX = """<div style="text-align:center;padding:14px 0 0;">
    <input id="site-search" type="search" placeholder="Search posts, companies, topics…" aria-label="Search the site" autocomplete="off"
      style="width:100%;max-width:420px;padding:10px 14px;border:1px solid #ccc;border-radius:8px;font-size:14px;">
    <div id="search-results" style="max-width:420px;margin:8px auto 0;text-align:left;"></div>
  </div>
  <script>
  (function(){
    var box=document.getElementById('site-search'), res=document.getElementById('search-results');
    if(!box) return;
    fetch('../search.json').then(function(r){return r.json();}).then(function(idx){
      box.addEventListener('input',function(){
        var q=box.value.trim().toLowerCase();
        if(q.length<2){res.innerHTML='';return;}
        var hits=idx.filter(function(e){return (e.title+' '+e.text).toLowerCase().indexOf(q)>=0;}).slice(0,8);
        res.innerHTML=hits.length?hits.map(function(h){
          return '<a href="../'+h.url+'" style="display:block;background:#fff;border:1px solid #e3e3e3;border-radius:8px;padding:10px 12px;margin-bottom:6px;text-decoration:none;color:inherit;">'
            +'<div style="font-size:12px;color:#0f5132;font-weight:600;">'+h.type+'</div>'
            +'<div style="font-size:14px;font-weight:600;color:#222;">'+h.title+'</div>'
            +'<div style="font-size:12px;color:#666;">'+h.excerpt+'</div></a>';
        }).join(''):'<div style="font-size:13px;color:#888;">No matches.</div>';
      });
    });
  })();
  </script>"""


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def entry_card(e):
    web = ""
    if e.get("website"):
        web = f'<div style="margin-top:6px;"><a href="{e["website"]}" style="color:#0f5132;font-size:13px;">Official website</a></div>'
    srcs = ", ".join(f'<a href="{s["url"]}" style="color:#0f5132;">{s["label"]}</a>' for s in e.get("sources", []))
    src_line = f'<div style="font-size:12px;color:#888;margin-top:6px;">Sources: {srcs}</div>' if srcs else ""
    mention = ""
    if e.get("first_mentioned"):
        ed = f' · <a href="../{e["edition"]}" style="color:#0f5132;">edition</a>' if e.get("edition") else ""
        mention = f'<div style="font-size:12px;color:#888;margin-top:4px;">First mentioned {e["first_mentioned"]}{ed}</div>'
    badge = "🏢" if e["type"] == "company" else "📖"
    return f"""<div id="{slug(e['name'])}" style="background:#fff;border:1px solid #e3e3e3;border-radius:10px;padding:14px 16px;margin-bottom:10px;scroll-margin-top:16px;">
      <div style="font-size:16px;font-weight:700;">{badge} {e["name"]}</div>
      <div style="font-size:14px;color:#333;margin-top:4px;line-height:1.6;">{e["description"]}</div>
      {web}{src_line}{mention}
    </div>"""


def main():
    entries = json.loads(DATA.read_text(encoding="utf-8"))
    # de-dupe by name (case-insensitive), keep first
    seen, uniq = set(), []
    for e in entries:
        k = e["name"].lower()
        if k not in seen:
            seen.add(k)
            uniq.append(e)
    companies = sorted([e for e in uniq if e["type"] == "company"], key=lambda e: e["name"].lower())
    concepts = sorted([e for e in uniq if e["type"] == "concept"], key=lambda e: e["name"].lower())

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Glossary — Companies & Concepts</title>
<style>
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; font-family: -apple-system, "Segoe UI", Arial, Helvetica, sans-serif; background: #f7f7f7; color: #222; }}
  .wrap {{ max-width: 720px; margin: 0 auto; padding: 0 16px 48px; }}
  .hero {{ background: #0f5132; color: #d1e7dd; padding: 32px 20px; border-radius: 0 0 12px 12px; text-align: center; }}
  .hero h1 {{ margin: 0; font-size: 24px; color: #fff; }}
  .hero p {{ margin: 8px 0 0; font-size: 14px; }}
  h2 {{ font-size: 19px; color: #0f5132; border-bottom: 2px solid #0f5132; padding-bottom: 6px; margin: 30px 0 14px; }}
  p.intro {{ font-size: 15px; line-height: 1.7; color: #333; }}
  a {{ color: #0f5132; }}
  footer {{ text-align: center; font-size: 12px; color: #888; margin-top: 40px; }}
</style>
</head>
<body>
<div class="wrap">
  {NAV}
  {SEARCH_BOX}
  <div class="hero" style="margin-top:16px;">
    <h1>Glossary</h1>
    <p>Companies and concepts from the Daily Brief, explained simply.</p>
  </div>

  <p class="intro" style="margin-top:20px;">Every edition mentions companies and ideas our readers ask about.
  This page collects them in one place and grows with each new edition.</p>

  <h2>🏢 Companies</h2>
  {"".join(entry_card(e) for e in companies) if companies else "<p class='intro'>None yet.</p>"}

  <h2>📖 Concepts</h2>
  {"".join(entry_card(e) for e in concepts) if concepts else "<p class='intro'>None yet.</p>"}

  <footer>Islamic Finance Daily Brief · Educational content — not financial advice.</footer>
</div>
</body>
</html>
"""
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({len(companies)} companies, {len(concepts)} concepts)")


if __name__ == "__main__":
    main()
