---
title: "Mapping Islamic fintech tech: Guidance, Lariba, Amana, UIF, Stearns — and who actually has an API"
date: "2026-10-07"
description: "Islamic fintech tech: the five big US names are lenders, not platforms — none has an API. The buildable tech is in screening data and infrastructure firms."
type: "post"
---

# Mapping Islamic fintech tech: Guidance, Lariba, Amana, UIF, Stearns — and who actually has an API

*October 7, 2026 · by Iftikar*

A note before you read: this post is educational only, not investment advice. Nothing here is a recommendation to buy, sell, hold, or use any security or company's products. Companies are named as examples, not endorsements. I am not a licensed financial advisor, and AI-assisted research can contain mistakes. Do your own research and consult a qualified professional before investing.

After writing about [Zoya's public API](zoya-finance-api.html), I wanted to know: what about the other names American Muslims actually use — the home financiers, the fund companies, the Islamic banks? Do any of them offer public technology — APIs, developer docs, open platforms — that a builder could use? I went looking. Here is the honest map.

## Executive summary

The five established US names I checked — Guidance Residential, Lariba, Amana/Saturna, UIF, and Stearns Bank's Salaam Banking — are traditional financial institutions, not tech platforms: **none of them offers a public API or developer program.** Their technology is internal (websites, customer portals, online applications). The public, buildable tech in Islamic finance lives almost entirely in a newer layer of data and infrastructure companies: Zoya and Musaffa for screening data, Fasset for trading and tokenization infrastructure, and Caiz for Sharia-compliant blockchain rails. If you want to build, that second group is where the doors are open.

## The five names, one by one

### Guidance Residential — US Islamic home finance

No public tech

[Guidance Residential](https://www.guidanceresidential.com/) is the largest US provider of Islamic home financing, operating since 2002 with over $4.9 billion funded through its Declining Balance Co-ownership program — you and the company co-own the home, and your monthly payments gradually buy out their share, with no interest involved. It is a lender, not a platform: I found no public API, developer docs, or partner integration program. What it does offer publicly is educational content (a knowledge center with ebooks, webinars, and articles explaining the co-ownership model) and a secure customer portal for applicants.

### Lariba — American Finance House Lariba

No public tech

[American Finance House Lariba](https://www.lariba.com/), based in Whittier, California, offers riba-free financing for homes, cars, and businesses, and is closely tied to Bank of Whittier, a fully licensed FDIC-member bank offering riba-free banking. It is a small, traditional lender. No public API, developer documentation, or tech platform of any kind — just a company website with application forms.

### Amana — Amana Mutual Funds Trust / Saturna Capital

No public tech

[Saturna Capital](https://www.saturna.com/) of Bellingham, Washington, has managed the [Amana mutual funds](https://www.amanafunds.com/) (tickers AMANX, AMAGX) since the 1980s — some of the longest-running halal mutual funds in the US. Shareowners get online account access, and the funds publish portfolio holdings monthly, but there is no public API or developer program. One clarification, because the name is confusing: this Amana is *not* the Middle East brokerage also called "amana" that partnered with Zoya on in-app Shariah screening — two different companies, same name.

### UIF — University Islamic Financial Corporation

No public tech

[UIF](https://www.myuif.com/), headquartered in Michigan, provides Shariah-compliant home and commercial financing (using murabaha cost-plus and ijarah leasing structures) across many US states, and has been covered by NPR and the New York Times for its faith-based lending. Like the others, it is a lender with a website and application process — no public API or developer offering.

### Stearns — Stearns Bank's Salaam Banking

No public tech

The "Stearns" in Islamic finance is [Stearns Bank](https://www.stearnsbank.com/) of St. Cloud, Minnesota, which launched **Salaam Banking** — a dedicated Islamic banking division offering deposit accounts and financing structured to avoid interest, overseen by its own Shariah Supervisory Board (the bank publishes its [Sharia compliance certificates](https://www.stearnsbank.com/hubfs/Signed_Sharia_Compliance_Certificate_-_Real_Estate_Acquisition_&_Refinancing.pdf)). It is a real, FDIC-member bank doing Islamic banking — but a bank, not a tech platform. No public API or developer program found.

## The wider landscape: who actually has public tech

So where *is* the buildable technology? In a newer layer of companies that sell data and infrastructure rather than loans:

- **Zoya API** — covered in [my earlier deep-dive](zoya-finance-api.html): a public GraphQL API for Shariah screening data (verdicts, revenue breakdowns, purification, zakat), with public docs at [developer.zoya.finance/docs](https://developer.zoya.finance/docs), a free sandbox, and personal and commercial plans.
- **Musaffa Halal Stocks API** Public API — [musaffa.com/for-business](https://musaffa.com/for-business/) offers an enterprise API with Shariah compliance data on 120,000+ stocks and ETFs across 70+ global exchanges, AAOIFI-based screening, real-time compliance-change alerts, and purification and zakat calculators, delivered over APIs and WebSockets. Aimed at fintechs, Islamic banks, brokerages, and robo-advisors; access is commercial (request a demo), not self-serve.
- **Fasset API** Public API — [fasset.com/enterprise/fasset-api](https://www.fasset.com/enterprise/fasset-api) offers trading, wallet, and tokenization APIs for enterprises — infrastructure for building crypto trading, payments, and tokenized-asset products. Relevant here because Fasset [partnered with Musaffa](https://fasset.com/blog/musaffa-and-fasset-partner-to-expand-regulated-tokenized-halal-investing/) to bring Shariah-compliant screening data onto its tokenized-investing rails.
- **Caiz API** Public API (verify independently) — [caizapi.com](https://caizapi.com) markets a developer API for building on Caizchain, a blockchain that claims Fiqh-compliant transaction governance, with SDKs and a sandbox advertised. I include it because the developer offering is genuinely public — but this corner of crypto deserves extra diligence, so verify everything independently before touching it.

Worth knowing but not public: **IdealRatings** (San Francisco, founded 2006) is the institutional data vendor behind much of the industry's screening — its data powers benchmarks like the FTSE IdealRatings Islamic Index Series — but it sells subscriptions and data feeds to institutions, with no public self-serve API.

## Who benefits and how

- **Developers** — the screening-data APIs (Zoya, Musaffa) are the practical starting point: halal status, revenue breakdowns, and purification math as API calls, instead of a research department. Fasset's APIs cover the next layer: trading, wallets, and tokenization infrastructure.
- **Founders** — pairing a screening-data API with an infrastructure API is close to a complete halal fintech stack: compliance data in, tradable products out. The five traditional names above show the gap this fills — none of them offers anything a startup can integrate with.
- **Curious learners** — even reading API docs is an education: Zoya's docs teach how AAOIFI screening actually works, and Musaffa's pages explain purification and zakat calculators better than most textbooks.

The pattern is clear: in US Islamic finance, the lenders lend and the tech companies enable. Knowing which is which saves a builder months of knocking on the wrong doors.

Please note: this post is strictly educational — a survey of publicly available information. I have no relationship with any company mentioned, and nothing here is an endorsement or a recommendation to use, buy, or invest in anything. I am not a financial advisor, this is not financial advice, and AI-assisted content can contain mistakes. Company offerings change over time — always verify against each company's own website before acting on anything here. Do your own research, and talk to a licensed professional before investing.

(I'm not a lawyer — these are standard educational disclaimers, written in plain language to keep things honest.)
