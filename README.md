# Newsletter site (GitHub Pages)

Static archive of the Islamic Finance Daily Brief.

## Structure

- `index.html` — archive listing (newest first)
- `editions/YYYY-MM-DD.html` — one page per edition
- `assets/banner.png` — banner image slot (replace when Iftikar provides one;
  then swap the `.banner-slot` div for an `<img>` tag — the HTML comment shows how)

## Adding a new edition

1. Copy the previous edition's HTML as a starting point.
2. Add a card at the top of the "Latest editions" list in `index.html`.

Only approved editions get published here.

## Publishing to GitHub Pages

1. `gh auth login` (one-time)
2. Create repo: `gh repo create <name> --public --source=. --push`
3. Enable Pages: repo Settings → Pages → Deploy from branch → `main` → `/ (root)`
   (or: `gh api repos/{owner}/{repo}/pages -f build_type=legacy ...` — simplest via web UI)
4. Site goes live at `https://<user>.github.io/<repo>/`
