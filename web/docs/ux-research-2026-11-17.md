# UX Research — Islamic Finance and Technology (islamicfintech.org)

Date: 2026-11-17. Prepared for Iftikar.
Goal in his words: the audience should be impressed with the look and feel, and
able to connect with the content.

## What was studied

1. **Laws of UX** (Jon Yablonski, lawsofux.com; video summary by Joseph Todaro,
   2019) — 19 psychological design principles. Full checklist: ~/workspace/UX-RULE.md
2. **Product Picnic on beehiiv** (productpicnic.beehiiv.com) — the subscribe
   entry Iftikar picked out: one line of text, one email field, one button,
   nothing else competing on the screen.
3. **Nielsen Norman Group article pages** (nngroup.com/articles/research-in-the-loop/,
   CSS measured 2026-11-17) — the article typography Iftikar picked out.
4. **Islamic Finance Guru** (islamicfinanceguru.com, checked 2026-11-17) — the
   closest comparable site: same audience (Muslims learning finance), running
   since 2015, claims ~4 million readers a month.
5. **This site** — home page, newsletters archive, edition pages, glossary.

## Findings

### 1. Reading comfort is set by type, and NN/g sets the bar

Measured from NN/g's own stylesheet:

- Article body: a serif (Source Serif), 20px, line height 1.85, weight 350.
- Headings: a clean sans, bold — H1 40px (34px on mobile), H2 30px, H3 26px.
- Lists: serif, 20px, line height 1.65.
- Every article opens with a short summary box before the body.

Big serif text with roomy spacing is why their articles feel calm and
trustworthy. It signals "written to be read", which is the Aesthetic-Usability
Effect from the Laws of UX: a page that looks well made is judged more usable
and more credible before a word is read.

This site before the change: Inter (sans) at 16px, line height 1.7, headings
24/20/18px. Correct and clean, but it read like an app, not a publication.

### 2. Subscribing must be one step, at the top (beehiiv)

The Product Picnic home page asks for an email in one row — field plus button —
near the top of the page, with a single line saying what the reader gets.
No box to find, no scroll to the bottom, no second decision (Hick's Law:
one action; Fitts's Law: one large target).

This site before the change: the only subscribe form sat at the bottom of
every page, inside a bordered box with a heading and a paragraph. A reader
who finished an edition had to reach the very end to find it, and a reader
who arrived ready to subscribe had to hunt for it.

### 3. IFG wins on connection, not on fonts

IFG's stylesheet shows body text in Inter — the same font this site already
uses — with headings in a display sans (Archia) up to 54px. Their advantage
is structure and people, not typography:

- **Two doors at the top.** "I'm new to investing" and "I'm an experienced
  investor" — the reader picks a path in one tap instead of facing everything
  at once (Hick's Law, done as audience split).
- **A "Start here" path.** Beginners get a step-by-step entry instead of an
  archive.
- **A reason to subscribe.** The email form offers a free course ("5 Money
  Mistakes Keeping Muslims Poor") plus the weekly newsletter — a named gift,
  not a bare "subscribe".
- **Faces and names.** Founders Ibrahim and Mohsin appear with photos, short
  quotes, and an "Our Story" section. Readers follow people, not a masthead.
- **Proof on the page.** "~4 million Muslims every month", "As seen on" logos,
  reader testimonials ("What the People Say").
- **More than articles.** A book, a podcast, a YouTube channel — several ways
  to stay connected after the first read.

This site today has none of these six: no start-here path, no named gift for
subscribing, no face on the home page (the About page carries his story, one
click away), no reader proof, and one format only.

### 4. This site's own strengths to keep

- One header, one nav, one footer everywhere (Jakob's Law — familiar patterns).
- Fast static pages, works with no JavaScript, clean on a 390px phone.
- Every story already connects to a real person by editorial rule — the
  connection habit exists in the writing; the design does not show it yet.

## Adopted on 2026-11-17 (Iftikar's "adopt all")

1. **NN/g article type on every edition and post:** Source Serif 4 body at
   20px, line height 1.85 (lists 1.65); headings stay Inter bold in brand
   green, sized up — H1 34px, H2 26px, H3 22px.
2. **beehiiv subscribe entry on the home page:** one line — "Get new lessons
   and editions by email. Free — educational only, never investment advice." —
   then one row: email field + Subscribe button, directly under the H1.
   The bottom subscribe box stays on all pages as the second chance.
3. Already live from earlier today: newsletters archive grouped by month with
   a featured latest edition and 44px month jump chips; body text 16px floor
   outside articles; #888 gray raised to #666 for contrast.

## Recommended next, in order (not yet built — Iftikar's call)

1. **A "Start here" door on the home page** (the IFG move, and the single
   biggest connection gap): two large cards under the subscribe entry —
   "New to Islamic finance" → the beginner guides (sukuk guide, ETF guide);
   "Following the daily news" → Daily Newsletters. One tap, reader sorted.
2. **A named gift for subscribing:** the weekly email already exists; name
   what a new subscriber gets first — for example the five beginner guides
   as a starter pack — and put that line above the subscribe entry in place
   of the generic line. (Needs his pick of the gift; no new content required
   if the guides are the gift.)
3. **A face on the home page:** one short block under the posts — his photo,
   two lines from the About letter ("7 years in payments…"), link to About.
   IFG's founders are the first thing their readers trust.
4. **A summary line at the top of each edition** (the NN/g move): one or two
   plain sentences under the edition title saying what today's edition
   teaches. The frontmatter description already holds this text — showing it
   on the page costs no new writing.
5. **Reader proof, when it exists:** a subscriber count or one reader quote
   on the home page, only when there is a true number or a real quote to use.
   Nothing invented.

## How each change will be judged

- Reading: time on edition pages and scroll depth (needs analytics — none
  installed today; Cloudflare Web Analytics is the free option, his call).
- Subscribing: Kit subscriber growth per week, before vs after 2026-11-17.
- Connection: replies to the weekly email and repeat visits, watched monthly.

## Sources

- Laws of UX — https://lawsofux.com (checklist: ~/workspace/UX-RULE.md)
- Product Picnic — https://productpicnic.beehiiv.com
- NN/g article + stylesheet — https://www.nngroup.com/articles/research-in-the-loop/,
  https://media.nngroup.com/static/css/output.95604a8dc597.css (measured 2026-11-17)
- Islamic Finance Guru — https://islamicfinanceguru.com, /articles,
  /legacy/build/app.css (checked 2026-11-17)
