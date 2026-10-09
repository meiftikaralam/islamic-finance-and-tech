#!/usr/bin/env python3
"""Build src/aaoifi_kb/data/standards.json from standards/*.md files.

Each markdown file carries YAML frontmatter (ss, title, category, one_line)
followed by ## sections. This script parses them into one JSON file that
ships with the package.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STANDARDS_DIR = ROOT / "standards"
OUT = ROOT / "src" / "aaoifi_kb" / "data" / "standards.json"

FRONTMATTER = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)
SECTION_HEAD = re.compile(r"^## (.+)$", re.MULTILINE)


def parse(path):
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER.match(text)
    if not m:
        raise ValueError(f"No frontmatter in {path.name}")
    fm_raw, body = m.group(1), m.group(2)
    fm = {}
    for line in fm_raw.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip().strip('"')
    for key in ("ss", "title"):
        if key not in fm:
            raise ValueError(f"Missing '{key}' in frontmatter of {path.name}")
    parts = SECTION_HEAD.split(body)
    sections = {}
    for i in range(1, len(parts), 2):
        sections[parts[i].strip()] = parts[i + 1].strip()
    sources = []
    if "Source" in sections:
        sources = re.findall(r"https?://\S+", sections["Source"])
    return {
        "ss": int(fm["ss"]),
        "slug": path.stem,
        "title": fm["title"],
        "category": fm.get("category", ""),
        "one_line": fm.get("one_line", ""),
        "sections": sections,
        "sources": sources,
    }


def main():
    files = sorted(STANDARDS_DIR.glob("ss-*.md"))
    if not files:
        print("No standard files found in standards/.", file=sys.stderr)
        sys.exit(1)
    data = [parse(p) for p in files]
    data.sort(key=lambda d: d["ss"])
    numbers = [d["ss"] for d in data]
    if len(set(numbers)) != len(numbers):
        dupes = sorted({n for n in numbers if numbers.count(n) > 1})
        print(f"Duplicate SS numbers: {dupes}", file=sys.stderr)
        sys.exit(1)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(data)} standards to {OUT}")


if __name__ == "__main__":
    main()
