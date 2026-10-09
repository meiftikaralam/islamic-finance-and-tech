#!/bin/bash
# Deploy the React site to GitHub Pages (repo root).
# Builds, prerenders, TESTS, and only then syncs + pushes.
# Usage: npm run deploy   (from web/)
set -e

WEB="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="$(cd "$WEB/.." && pwd)"

cd "$WEB"
npm run gen:routes
npm run build
npm run prerender
npm test  # aborts here if anything fails

# Sync built files to the repo root (what Pages serves).
# Source dirs and repo files are preserved; everything else syncs from dist.
rsync -a --delete \
  --exclude 'web/' \
  --exclude 'content/' \
  --exclude 'aaoifi-educational-kb/' \
  --exclude '.git/' \
  --exclude 'README.md' \
  --exclude '.gitignore' \
  --exclude 'lab/README.md' \
  "$WEB/dist/" "$ROOT/"

cd "$ROOT"
git add -A
if git diff --cached --quiet; then
  echo "nothing to deploy"
else
  git -c user.name="Muse" -c user.email="muse@local" \
    commit -m "Deploy React site" -m "Static prerender of all routes (SEO-safe, same URLs)."
  git push origin main
  echo "deployed"
fi
