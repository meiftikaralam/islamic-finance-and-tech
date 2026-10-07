# aaoifi-kb — AAOIFI Shariah Standards in Simple English

Every AAOIFI Shariah Standard (SS 1–62), summarized in plain language anyone
can understand — no background in Islam or finance needed. Each summary
explains what the standard is about, why it exists, its key rules, an
everyday example, and the words you need to know. Every file cites its
sources.

## What's here

- `standards/` — one Markdown file per Shariah Standard (`ss-08-murabaha.md`, …)
- `overviews/` — one-line guides to AAOIFI's other families: accounting (FAS),
  auditing, governance, and ethics standards
- `src/aaoifi_kb/` — a tiny Python package so anyone can use this as a
  knowledge base in code
- `scripts/build_data.py` — regenerates the package data from `standards/`
- `scripts/humanizer_check.py` — scans the text for AI-writing tells, using the
  pattern list from [blader/humanizer](https://github.com/blader/humanizer)

## Scope notes (accuracy first)

- Summaries follow AAOIFI's published Shariah Standards as of 2026. Where
  AAOIFI has issued a newer standard on an old topic (e.g. SS 60 on Waqf
  alongside the original SS 33), both are covered and the relationship is noted.
- SS 62 (Sukuk) is an **exposure draft**, not a final standard. Its file says
  so clearly.
- Summaries are simplifications for learning, not legal rulings. For any real
  transaction, the institution's Shariah board decides — this package does not
  replace it.

## Use it as a Python package

```bash
pip install .
```

```python
import aaoifi_kb

aaoifi_kb.list_standards()            # [(number, title, one-line summary)]
aaoifi_kb.list_standards("Trade")     # filter by category
aaoifi_kb.categories()                # all topic categories
aaoifi_kb.get_standard(8)             # full record: sections, sources, …
aaoifi_kb.search("sukuk")             # keyword search across everything
```

## Use the Markdown directly

The `standards/` folder is plain Markdown with YAML frontmatter
(`ss`, `title`, `category`, `one_line`) — drop it into any docs site, wiki,
or RAG pipeline.

## How the text was written

Drafts were researched against AAOIFI publications (via IslamicMarkets'
per-standard pages and AAOIFI's own syllabi), kept to well-established points,
and then edited with the [blader/humanizer](https://github.com/blader/humanizer)
pattern list to remove AI-writing tells. Run `scripts/humanizer_check.py` to
re-check.

## License

Content: free for educational use. Code: MIT.
