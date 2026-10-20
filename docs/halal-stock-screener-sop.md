# SOP — Halal Stock Screener (Daily)

Owner: Iftikar. Purpose: a daily mechanical screen that starts from every US-listed Shariah ETF, applies AAOIFI standards, then Graham value and Buffett quality filters, then a due-diligence score, and ends with sector-wise rankings. Educational only — this is a screening tool built on Iftikar's own rules, not investment advice. Every report carries the standard disclaimer: educational only, not investment advice, nothing here recommends buying, selling, or holding any security.

## Step 1 — Universe (all US Shariah ETF holdings)
- Pull the current holdings of every US-listed Shariah equity ETF: SPUS, HLAL, WSHR, UMMA (add SPRE/SPTE if equity holdings are published).
- Sources: the funds' public holdings pages/files. Record the capture date and the holding count per fund.
- Union all holdings, dedupe by ticker. Exclude cash rows, CVRs, and zero-price rows. This union is the starting universe (expect roughly 300-400 unique tickers).

## Step 2 — AAOIFI Shariah screen (SS 21)
Apply AAOIFI Shariah Standard 21 ratios to every stock in the universe:
- Business activity: the company's core business must be permissible (no conventional banking/insurance, alcohol, gambling, pork, tobacco, weapons, adult entertainment as the main business).
- Interest-bearing debt must be below 30% of market capitalization.
- Cash plus interest-bearing securities must be below 30% of market capitalization.
- Impermissible (non-halal) revenue must be below 5% of total revenue, using the best available segment data; where segment data is unavailable, flag the stock as "revenue split unverified" instead of passing it silently.
- Keep only stocks passing all applicable ratios. Report how many passed and how many failed each ratio.

## Step 3 — Graham value + Buffett quality filters
- Graham (corrected formula): V* = TTM diluted EPS × (8.5 + 2g) × 4.4 ÷ Y, g = EPS CAGR capped 0-15 as percentage points, Y = current Moody's AAA yield (FRED DAAA). Margin of safety = V* ÷ price. Rank by margin of safety.
- Buffett's three checks: (1) 5-year average ROE above 15%; (2) positive EPS in at least 8 of the last 10 years; (3) debt-to-equity below 1.0 or interest coverage above 5x. Flag buyback-distorted negative-equity cases in plain words.
- Keep stocks passing all three Buffett checks; carry their margin-of-safety rank forward.
- Also compute dividend yield (from actual payment records) and the steady-payer mark (pays now + yield ≥ 1.5% + dividends in at least 8 of last 10 years).

## Step 4 — Due diligence score (0-10) and 3-year potential
For the top candidates after Step 3 (top 3 per sector, plus any stock with margin of safety above 1.0), research and score:
- Business performance, last 3-5 years (0-4 points): revenue growth trend, earnings trend, margin stability — from filings/data, not opinion.
- Management and capital allocation (0-3 points): buyback/dividend record, debt discipline, major decisions in the news.
- News and risks, last 90 days (0-3 points): earnings results, guidance changes, lawsuits, regulatory or product risks.
- Macro overlay (written note, not points): the sector's current conditions — oil prices for energy, interest rates for rate-sensitive sectors, AI spending cycle for software/tech, housing for builders — and what it means for the next 3 years.
- 3-year potential note: one or two plain sentences on upside potential and the main risk, grounded in the research above. No price targets presented as predictions; describe it as scenario reasoning.

## Step 5 — Output (sector-wise)
- One report per day: ~/workspace/halal-screener/reports/YYYY-MM-DD.md and .html.
- Sector-wise ranked tables (energy, healthcare, industrials, software/tech, consumer, materials, utilities, real estate, other): top 3 per sector. Columns: rank, ticker, company, what it does, price, Graham value, margin of safety, Buffett verdict, dividend yield + steady mark, due-diligence score /10, one-line 3-year potential note.
- A final combined list: the day's top 10 across all sectors by combined standing (margin of safety + Buffett pass + due-diligence score).
- Funnel counts at the top: universe size → AAOIFI pass → Buffett pass → scored finalists.
- Plain small-text disclaimer at the top. Plain direct sentences, no analogies, no hype.
- Chat delivery: a short summary with the funnel counts, the top 5 names, and links to the report files.

## Schedule
- Runs every day at about 7:00 PM Pacific. Prices and yields as of that day's close.
- If a data source fails, the report says so plainly and uses the most recent available data with its date labeled.
