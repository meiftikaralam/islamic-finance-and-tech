# Posts publishing rule

Every post ships as a **pair**: `post-name.md` + `post-name.html`.

- **Write/review in Markdown.** Iftikar reviews PRs in the `.md` file — it must read cleanly on its own: full title, date, all sections, links, and disclaimer text.
- **Ship both.** The `.html` is the styled published page; the `.md` is its content twin. Never add one without the other.
- **Generate, don't hand-transcribe.** After finalizing the HTML, run `python3 ~/workspace/islamic-finance-newsletter/html_to_md.py site/lab/<post>.html` and eyeball the result before committing.
- Same rule already applies to the knowledge base (`knowledge-base/*.md` + `*.html`).
