"""aaoifi_kb — AAOIFI Shariah Standards in simple English.

A tiny, dependency-free knowledge base: every AAOIFI Shariah Standard
summarized in plain language anyone can understand, even with no
background in Islam or finance.

Usage:
    import aaoifi_kb

    aaoifi_kb.list_standards()          # [(number, title, one-line summary)]
    aaoifi_kb.get_standard(8)           # full record for SS 8 (Murabaha)
    aaoifi_kb.search("sukuk")           # records matching a keyword
    aaoifi_kb.categories()              # list of topic categories
"""

import json
from pathlib import Path

__version__ = "0.1.0"

_DATA_FILE = Path(__file__).parent / "data" / "standards.json"

_STANDARDS = None


def _all():
    global _STANDARDS
    if _STANDARDS is None:
        with open(_DATA_FILE, encoding="utf-8") as f:
            _STANDARDS = json.load(f)
    return _STANDARDS


def list_standards(category=None):
    """Return [(ss_number, title, one_line)] for every standard.

    Pass a category (see categories()) to filter, e.g. "Trade".
    """
    out = []
    for s in _all():
        if category and s["category"].lower() != category.lower():
            continue
        out.append((s["ss"], s["title"], s["one_line"]))
    return out


def categories():
    """Return the sorted list of topic categories."""
    return sorted({s["category"] for s in _all() if s["category"]})


def get_standard(ss_number):
    """Return the full record (dict) for one standard, or None.

    The record has: ss, slug, title, category, one_line,
    sections (dict of heading -> text), sources (list of URLs).
    """
    for s in _all():
        if s["ss"] == int(ss_number):
            return s
    return None


def search(keyword):
    """Case-insensitive search over titles, summaries and rules.

    Returns the list of matching full records.
    """
    kw = keyword.lower()
    hits = []
    for s in _all():
        hay = " ".join([s["title"], s["one_line"]] + list(s["sections"].values()))
        if kw in hay.lower():
            hits.append(s)
    return hits
