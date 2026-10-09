---
title: "Zoya Finance opened its API: halal screening data for developers"
date: "2026-10-07"
description: "Zoya Finance opened its halal screening API to developers — what it means for Islamic fintech."
type: "post"
---

# Zoya Finance opened its API: halal screening data for developers

*October 7, 2026 · by Iftikar*
*Please note: this post is strictly educational — a walkthrough of publicly available developer documentation. Nothing here is financial advice or a recommendation to buy, sell, or hold any security. I am not a financial advisor, and AI-assisted content can contain mistakes. Do your own research and talk to a licensed professional before investing.*

I have been digging into [Zoya Finance's public API](https://zoya.finance/api) — the developer offering from the team behind the Zoya halal investing app. If you have ever wondered how an app decides whether a stock is halal, this API is literally that decision engine, packaged so other people can build on it. Here is what I found in their [public documentation](https://developer.zoya.finance/docs), explained simply.

## Executive summary

Zoya — the halal investing app that helps people build and monitor Shariah-compliant portfolios — now offers its screening dataset as a public API. Instead of building your own Shariah compliance engine from scratch, you can query Zoya's: send a stock ticker, get back a compliance verdict, the reasoning behind it, and even zakat math. It is a GraphQL API (a modern way of asking a server for exactly the data fields you want), with a free sandbox for testing and paid plans for real data. The short version: **halal screening is now a building block any developer can plug into an app, a brokerage, or an AI agent.**

## Who the API is for

Zoya's own [pricing page](https://zoya.finance/api) splits the audience in two, and the split is honest:

- **Individual investors and researchers** — people studying markets, testing ideas, or building personal tools. The personal plans are "tailored for individual investors and researchers."
- **Businesses and professionals** — fintech builders, brokerages, advisors, and institutions that want compliance data inside their own products. The commercial plans are described as "empowering businesses and professionals."

Their [launch announcement](https://blog.zoya.finance/introducing-the-zoya-api/) puts it more ambitiously: the API exists so developers can "build and launch world-class, Shariah-compliant financial products faster and at a fraction of the cost." If I translate that into concrete people: a developer building a halal robo-advisor, a brokerage that wants a "halal" badge next to each stock, a researcher studying compliance trends, or someone like me wiring screening data into an AI agent.

## Core features of the public API

All of this comes from the [official API reference](https://developer.zoya.finance/docs). The API is organized into three namespaces — think of them as three toolboxes:

- **`basicCompliance` — the verdict.** Ask for a stock by ticker ( `report(symbol: "AMD")`) and get back the essentials: company name, exchange, the compliance status, the report date, and a purification ratio. You can also pull the whole US list ( `reports`) page by page, filter for only compliant stocks, or get compliance reports for US-listed ETFs and funds ( `funds`). The basic package covers US stocks and US-listed ETFs using the AAOIFI methodology.
- **`advancedCompliance` — the reasoning.** This is where it gets interesting. Beyond the verdict, you see *why*: a **business screen** (where does the company's revenue come from — broken into compliant, non-compliant, and questionable revenue) and a **financial screen** (debt and interest ratios, like debt-to-market-cap). The advanced package also covers 20+ global markets, lets you look stocks up by FIGI (a permanent security ID that survives ticker changes), and includes a dedicated MENA-region endpoint ( `menaScreens`).
- **`zakat` — the math.** `zakat.calculate` takes a list of holdings and returns the zakat due. You tell it your intent per holding — `ACTIVE` (planning to trade within a year, treated like cash) or `PASSIVE` (long-term holding, where it looks through to the company's assets). It even tells you which calculation method it actually used, so the number is explainable.

**How the data model thinks about compliance.** This is my favorite design detail: compliance is not a yes/no flag. It is a four-value scale — `COMPLIANT`, `NON_COMPLIANT`, `QUESTIONABLE` (revenue sits in an area where scholars genuinely disagree, or the filings don't say enough), and `UNRATED` (no rating exists). The docs explicitly warn: don't let "questionable" or "unrated" silently render as "non-compliant" in your product — they mean "we cannot tell you," not "no." A status is also always relative to a methodology; the same stock can rate differently under different rulebooks. Today the only methodology is AAOIFI, and it is a required input so future methodologies won't break existing code.

**How you talk to it.** Every call is an HTTP POST to a GraphQL endpoint — `https://sandbox-api.zoya.finance/graphql` for testing, `https://api.zoya.finance/graphql` for real data — with your API key in the `Authorization` header ( `sandbox-` or `live-` prefix). The sandbox is free and needs no subscription, but its data is randomized — the docs are blunt that it "must not be surfaced as investment or compliance information." Rate limit: 10 requests per second. There is an in-browser API explorer, the full schema is published as a file your editor or AI coding assistant can read, and the announcement mentions an SDK.

## How different people benefit

Concrete scenarios, based on what the API actually offers:

- **A fintech founder** building a halal investing app doesn't need to hire scholars and data engineers to build a screening engine — the hardest part of the product is now an API call. That is the difference between a six-month build and a weekend prototype.
- **A brokerage or advisor platform** can show a compliance badge next to every stock, like the "Blue Crescent" indicator one Middle East brokerage built on Zoya's screening tech (reported in the press — more on that below). One query per ticker, and your whole catalog is screened.
- **An investor setting up a startup** around ethical finance can validate the idea cheaply: prototype against the free sandbox, show real screens to early users, and only pay when going live.
- **Someone building AI agents or tools** — this is the one closest to my own experiments — can give an agent a ground-truth compliance source. Instead of the agent guessing whether a stock is halal, it queries Zoya and cites the verdict, the revenue breakdown, and the methodology. That turns a chatbot opinion into a sourced answer.
- **A researcher** can pull the full US compliance list and study patterns: which sectors pass, how purification ratios distribute, how verdicts change over time.

## Examples from their documentation

The [docs](https://developer.zoya.finance/docs) include complete runnable guides — real queries with real responses. A few that show the range:

- **One stock's verdict:** query `basicCompliance.report` for AMD and get back "Advanced Micro Devices Inc., XNAS, COMPLIANT" — about a minute of work, per their quickstart.
- **The full US list, filtered:** page through `basicCompliance.reports` with a `status: COMPLIANT` filter to build your own halal stock universe.
- **The full reasoning:** an advanced query for AMD returns the verdict plus `businessScreen`, `financialScreen`, and the revenue split — e.g. ~99.7% compliant revenue, ~0.27% non-compliant — plus AAOIFI ratios like debt-to-market-cap.
- **International stocks:** query a London-listed ticker (symbol plus exchange code, like `0R0K-LN`) for the same detailed report.
- **ETFs:** `basicCompliance.funds` lists fund reports — their example shows SPDR Gold Shares as COMPLIANT and a total bond market ETF as NON_COMPLIANT, each with a purification ratio and the date the holdings data was current.
- **Zakat:** pass in holdings with quantities and intent, and get back the zakat-liable amount and zakat due per holding and for the portfolio.

**A real-world integration (press-reported, not from the docs):** the Middle East brokerage amana partnered with Zoya to put real-time Shariah screening inside its trading app — a "Blue Crescent" icon marking compliant assets, one-click access to the certification behind each verdict, and a dedicated Shariah section. It is the clearest public example of what the commercial side of this data is for: a brokerage renting the screening engine instead of building one.

## Pricing and the rules of the road

As listed on [zoya.finance/api](https://zoya.finance/api) (check the page itself for current numbers): personal plans run from a basic tier (compliance ratings, US stocks, AAOIFI rulebook, personal-use license) up to Advanced at $139/month ($115 billed annually, adding financial ratios and 20+ global markets). Commercial plans start at $399/month ($332 annual) for the basic data with a commercial license, $1,399/month ($1,165 annual) for Advanced with priority support, and a Custom tier with bespoke rulebooks and SLAs. Two license types matter: **personal** (for individuals and researchers — no public display of the data) and **commercial** (internal display allowed; showing data to the public needs Zoya's prior written approval). Attribution is required for everyone — a "Data provided by Zoya" link near the data. And a practical security note from the docs: never expose your API key in a client-side app; proxy requests through your own server.

## Why I'm writing about this

This post is about learning how finance works — and increasingly, finance works through APIs and agents. Zoya's API is a clean example of a genuinely hard problem (Shariah screening, done properly, with scholarly methodology) turned into infrastructure anyone can build on. Whether you are a developer, a founder, or just curious how the halal badge in your brokerage app gets there, it is worth understanding. I will keep experimenting with this kind of data in my own agent work and write up what I learn.

*Please read: this post is strictly educational — a walkthrough of publicly available developer documentation. I have no relationship with Zoya Finance, and nothing here is an endorsement or a recommendation to use, buy, or subscribe to anything. I am not a financial advisor, this is not financial advice, and AI-assisted content can contain mistakes. API details, pricing, and features change over time — always verify against [Zoya's own documentation](https://developer.zoya.finance/docs) before building anything. Do your own research, and talk to a licensed professional before investing.*

