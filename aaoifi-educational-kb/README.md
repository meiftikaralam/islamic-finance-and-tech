# aaoifi-educational-kb — AAOIFI Shariah Standards in Simple English

An educational knowledge base: every AAOIFI Shariah Standard (SS 1–62),
summarized in plain language anyone can understand — no background in Islam
or finance needed. Each summary explains what the standard is about, why it
exists, its key rules, an everyday example, and the words you need to know.
Every file cites its sources.

## Course objectives

This material is built for self-learners and study groups working through
Islamic finance from zero. After working through these summaries, a reader
should be able to:

1. Name what each AAOIFI Shariah Standard covers and why it exists.
2. Explain the key rules of common contracts (murabaha, ijarah, salam,
   istisna'a, musharaka, mudaraba, takaful, sukuk) in plain words.
3. Tell the difference between a standard's actual rule and common industry
   practice.
4. Know where to look next — every summary points at its sources, so deeper
   study starts from verified ground.

## Suggested syllabus

- **Weeks 1–2:** SS 8 (Murabaha), SS 9 (Ijarah), SS 10 (Salam), SS 11
  (Istisna'a) — the four contracts behind most Islamic bank financing.
- **Weeks 3–4:** SS 12 (Musharaka), SS 13 (Mudaraba), SS 26 (Takaful),
  SS 17 (Investment Sukuk) — partnership, insurance, and capital markets.
- **Weeks 5–6:** SS 4 (Set-Off), SS 18 (Possession), SS 19 (Qard),
  SS 30 (Tawarruq) — the mechanics underneath the contracts.
- **After that:** pick by interest. SS 21 (Financial Papers) for stock
  screening, SS 57 (Gold), SS 61 (Payment Cards) for everyday topics.

Read the "Scope notes" below first — two standards are superseded and one is
a draft, and the files say so.

## What's here

- `standards/` — one Markdown file per Shariah Standard (`ss-08-murabaha.md`, …)
- `overviews/` — one-line guides to AAOIFI's other families: accounting (FAS),
  auditing, governance, and ethics standards
- `src/aaoifi_kb/` — a tiny Python package so anyone can use this as a
  knowledge base in code
- `scripts/build_data.py` — regenerates the package data from `standards/`
- `scripts/humanizer_check.py` — scans the text for AI-writing tells, using the
  pattern list from [blader/humanizer](https://github.com/blader/humanizer)
- `LICENSE` — Creative Commons Attribution-NonCommercial 4.0 International
  (CC BY-NC 4.0)

## Scope notes (accuracy first)

- Summaries follow AAOIFI's published Shariah Standards as of 2026. Where
  AAOIFI has issued a newer standard on an old topic, the old file is a
  short historical pointer and the new standard carries the full summary:
  SS 33 (Waqf) points to SS 60, and SS 2 (cards) points to SS 61.
- SS 62 (Sukuk) is an **exposure draft**, not a final standard. Its file says
  so clearly.
- Summaries are simplifications for learning, not legal rulings. For any real
  transaction, the institution's Shariah board decides — this package does not
  replace it.

## Intellectual property and academic integrity

- The AAOIFI Shariah Standards are the intellectual property of the
  Accounting and Auditing Organization for Islamic Financial Institutions
  (AAOIFI). These summaries are independent paraphrases written for
  education. They are not published by, affiliated with, or endorsed by
  AAOIFI.
- Nothing here reproduces AAOIFI's standard texts. Readers who need the
  authoritative wording should consult AAOIFI's official publications
  (https://aaoifi.com).
- Sources are cited per file so every claim can be checked. If you find an
  error, please report it — accuracy is the point of this project.

## Non-commercial use

This knowledge base is licensed under CC BY-NC 4.0 (see `LICENSE`). You may
share and adapt it for learning, teaching, and research, with attribution.
**Commercial use is not permitted** — do not use this material for business
development, paid products, paid courses, or paid services.

## Educational disclaimer

For educational purposes only — not investment advice, not a fatwa, and not
a substitute for qualified Shariah or financial counsel. Nothing here is a
recommendation to buy, sell, or hold any security. Companies and products
mentioned are examples for learning, never endorsements. AI-assisted content
can contain mistakes; do your own research and consult a qualified
professional before making financial decisions.
