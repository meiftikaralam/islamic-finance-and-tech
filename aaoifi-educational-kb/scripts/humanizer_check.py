#!/usr/bin/env python3
"""Scan markdown files for AI-writing tells, using the pattern list from
blader/humanizer (https://github.com/blader/humanizer), an agent skill built
on Wikipedia's "Signs of AI writing".

This is a regex pre-pass: it flags candidate tells for a human editor to
review. It does not rewrite anything.

Usage: python3 humanizer_check.py [path]   (default: standards/ dir)
"""
import re
import sys
from pathlib import Path

CHECKS = [
    ("not-X-but-Y", re.compile(r"\b[Nn]ot (just|only|merely)\b[^.\n]{0,80}\bbut\b")),
    ("one-line closer", re.compile(r"(?m)^(?:That's|This is) the real .{0,50}\.\s*$")),
    ("staged opener", re.compile(r"(?i)\b(let's dive in|here's the thing|honestly\?|imagine this|picture this)\b")),
    ("stock AI word", re.compile(r"(?i)\b(delve|testament to|landscape|showcasing|nestled|pivotal|game-?changer|at its core|in today's fast-paced)\b")),
    ("inflated significance", re.compile(r"(?i)\b(pivotal moment|bright future|continues? to thrive|usher in a new era|revolutioniz\w+)\b")),
    ("chatbot residue", re.compile(r"(?i)\b(great question|hope this helps|let me know if you'd like)\b")),
    ("writing about the doc", re.compile(r"(?i)\b(this section explains|the table below|as discussed (above|below)|in this article, we)\b")),
    ("emoji", re.compile("[\U0001F300-\U0001FAFF\u2600-\u27BF]")),
]


def check_file(path):
    text = path.read_text(encoding="utf-8")
    hits = []
    for name, rx in CHECKS:
        for m in rx.finditer(text):
            line = text[: m.start()].count("\n") + 1
            hits.append((name, line, m.group(0)[:60]))
    bolds = len(re.findall(r"\*\*", text)) // 2
    if bolds > 14:
        hits.append(("bold-heavy", 0, f"{bolds} bold spans"))
    return hits


def main():
    target = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("standards")
    files = sorted(target.rglob("*.md")) if target.is_dir() else [target]
    total = 0
    for f in files:
        for name, line, snippet in check_file(f):
            print(f"{f.name}:{line}: [{name}] {snippet}")
            total += 1
    print(f"\n{total} potential tell(s) across {len(files)} file(s).")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
