#!/usr/bin/env python3
"""Build site/search.json — the client-side search index.

Scans editions, lab posts, glossary entries, about + playbook pages.
Run from the site repo root: python3 build_search.py

Each entry: {title, url, type, excerpt, text}
- url is relative to the site root (page JS prepends the right prefix)
- text is the searchable blob (title + headings + excerpt)
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


class Text(HTMLParser):
    """Extract title, headings, and first paragraphs from a page."""

    def __init__(self):
        super().__init__()
        self.title = ""
        self.headings = []
        self.paras = []
        self._cur = None

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self._cur = "title"
        elif tag in ("h2", "h3"):
            self._cur = "h"
            self._buf = ""
        elif tag == "p":
            self._cur = "p"
            self._buf = ""

    def handle_endtag(self, tag):
        if tag == "title":
            self._cur = None
        elif tag in ("h2", "h3") and self._cur == "h":
            t = self._buf.strip()
            if t and len(t) < 140:
                self.headings.append(t)
            self._cur = None
        elif tag == "p" and self._cur == "p":
            t = re.sub(r"\s+", " ", self._buf).strip()
            if len(t) > 60:
                self.paras.append(t)
            self._cur = None

    def handle_data(self, data):
        if self._cur == "title":
            self.title += data
        elif self._cur in ("h", "p"):
            self._buf += data


def parse(path):
    t = Text()
    t.feed(path.read_text(encoding="utf-8"))
    return t


entries = []

# Newsletter editions
for f in sorted((ROOT / "editions").glob("*.html")):
    t = parse(f)
    date = t.title.split("—")[-1].strip() if "—" in t.title else t.title
    first_story = next((h for h in t.headings if h and "stories" not in h.lower()), "")
    entries.append({
        "title": f"Daily Brief — {date}",
        "url": f"editions/{f.name}",
        "type": "Newsletter edition",
        "excerpt": re.sub(r"^\d+\.\s*", "", first_story)[:140],
        "text": " ".join(t.headings),
    })

# Lab posts (not the lab index)
for f in sorted((ROOT / "lab").glob("*.html")):
    if f.name == "index.html":
        continue
    t = parse(f)
    entries.append({
        "title": t.title.strip(),
        "url": f"lab/{f.name}",
        "type": "Post",
        "excerpt": (t.paras[0][:160] if t.paras else ""),
        "text": " ".join(t.headings),
    })

# Glossary entries (deep links via anchors)
data = json.loads((ROOT / "glossary" / "data.json").read_text(encoding="utf-8"))
for e in data:
    entries.append({
        "title": e["name"],
        "url": f"glossary/index.html#{slug(e['name'])}",
        "type": f"Glossary: {e['type']}",
        "excerpt": e["description"][:160],
        "text": e["description"],
    })

# About + playbook + newsletters hub
for f, typ in [("about.html", "About"), ("playbook/index.html", "How it's made"),
               ("newsletters.html", "Newsletters")]:
    t = parse(ROOT / f)
    entries.append({
        "title": t.title.strip() or typ,
        "url": f,
        "type": typ,
        "excerpt": (t.paras[0][:160] if t.paras else ""),
        "text": " ".join(t.headings),
    })

out = ROOT / "search.json"
out.write_text(json.dumps(entries, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"Wrote {out} ({len(entries)} entries)")
