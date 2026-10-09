#!/usr/bin/env python3
"""Generate site/aaoifi/index.html — the website's AAOIFI Standards tab —
from the knowledge-base data (src/aaoifi_kb/data/standards.json).

Run from the repo root: python3 aaoifi-educational-kb/scripts/build_site_page.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent  # site/
DATA = ROOT / "aaoifi-educational-kb" / "src" / "aaoifi_kb" / "data" / "standards.json"
OUT = ROOT / "aaoifi" / "index.html"
REPO = "https://github.com/meiftikaralam/islamic-finance-and-tech"

NAV = """<nav style="text-align:center;padding:16px 0 0;font-size:14px;">
    <a href="../index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">Archive</a>
    <a href="../about.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">About</a>
    <a href="index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;font-weight:bold;">AAOIFI Standards</a>
    <a href="../playbook/index.html" style="color:#0f5132;margin:0 12px;text-decoration:none;">How it's made</a>
  </nav>"""


def card(s):
    draft = ""
    if s["ss"] == 62:
        draft = ' <span style="background:#fff3cd;border:1px solid #e8d48b;color:#664d03;font-size:11px;padding:2px 8px;border-radius:10px;">DRAFT</span>'
    return f"""<div style="background:#fff;border:1px solid #e3e3e3;border-radius:10px;padding:14px 16px;margin-bottom:10px;">
      <div style="font-size:13px;color:#0f5132;font-weight:700;">SS {s["ss"]}{draft}</div>
      <div style="font-size:16px;font-weight:600;margin:2px 0 4px;">{s["title"]}</div>
      <div style="font-size:14px;color:#444;">{s["one_line"]}</div>
      <div style="margin-top:8px;"><a href="{REPO}/blob/main/aaoifi-educational-kb/standards/{s["slug"]}.md" style="color:#0f5132;font-size:13px;">Read the full summary</a></div>
    </div>"""


def main():
    standards = json.loads(DATA.read_text(encoding="utf-8"))
    by_cat = {}
    for s in standards:
        by_cat.setdefault(s["category"] or "General", []).append(s)

    sections = []
    for cat in sorted(by_cat):
        cards = "\n".join(card(s) for s in by_cat[cat])
        sections.append(f"<h2>{cat}</h2>\n{cards}")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AAOIFI Standards in Simple English</title>
<style>
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; font-family: -apple-system, "Segoe UI", Arial, Helvetica, sans-serif; background: #f7f7f7; color: #222; }}
  .wrap {{ max-width: 720px; margin: 0 auto; padding: 0 16px 48px; }}
  .hero {{ background: #0f5132; color: #d1e7dd; padding: 32px 20px; border-radius: 0 0 12px 12px; text-align: center; }}
  .hero h1 {{ margin: 0; font-size: 24px; color: #fff; }}
  .hero p {{ margin: 8px 0 0; font-size: 14px; }}
  h2 {{ font-size: 19px; color: #0f5132; border-bottom: 2px solid #0f5132; padding-bottom: 6px; margin: 30px 0 14px; }}
  p {{ font-size: 15px; line-height: 1.7; color: #333; }}
  a {{ color: #0f5132; }}
  .note {{ background: #fff; border: 1px solid #e3e3e3; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: #555; }}
  footer {{ text-align: center; font-size: 12px; color: #888; margin-top: 40px; }}
</style>
</head>
<body>
<div class="wrap">
  {NAV}
  <div class="hero" style="margin-top:16px;">
    <h1>AAOIFI Standards in Simple English</h1>
    <p>All 62 Shariah Standards, summarized so anyone can understand them.</p>
  </div>

  <p style="margin-top:20px;">AAOIFI — the Accounting and Auditing Organization for Islamic Financial
  Institutions — writes the global rulebook for Islamic finance. Its Shariah Standards say what is
  allowed and what is not. Each summary below explains one standard in plain language: what it is
  about, why it exists, its key rules, and an everyday example.</p>

  <div class="note">
    <strong>Scope notes.</strong> SS 61 (Payment Cards) replaces SS 2, and SS 60 (Waqf) replaces
    SS 33 — both versions are kept and the replacement is noted. SS 62 (Sukuk) is an
    <strong>exposure draft</strong>, not a final standard. Summaries are for learning, not legal
    rulings — an institution's Shariah board decides real cases. Full sources are cited in each
    summary. Developers: the whole knowledge base ships as a Python package
    (<a href="{REPO}/tree/main/aaoifi-educational-kb">aaoifi-educational-kb</a>) you can pip-install and query.
  </div>

  <div class="note" style="margin-top:12px;">
    <strong>Intellectual property.</strong> The AAOIFI Shariah Standards are the intellectual
    property of the Accounting and Auditing Organization for Islamic Financial Institutions
    (AAOIFI). These summaries are independent paraphrases written for education — not published
    by, affiliated with, or endorsed by AAOIFI. Nothing here reproduces AAOIFI's standard texts;
    readers who need the authoritative wording should consult AAOIFI's official publications
    (https://aaoifi.com).
  </div>

  <div class="note" style="margin-top:12px;">
    <strong>Non-commercial use.</strong> This knowledge base is shared under
    <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a> for learning,
    teaching, and research with attribution. Commercial use — including business development,
    paid products, or paid services built on this material — is not permitted.
  </div>

  {"\n".join(sections)}

  <footer>Islamic Finance Daily Brief · Educational content — not financial or religious advice.</footer>
</div>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({len(standards)} standards)")


if __name__ == "__main__":
    main()
