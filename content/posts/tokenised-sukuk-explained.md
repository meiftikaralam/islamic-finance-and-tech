---
title: "Tokenised sukuk, explained in plain English"
date: "2026-10-10"
description: "What a tokenised sukuk is, what settlement means, the tech inside the $100M ADI Foundation–Tokinvest deal, and how the same could be built in the USA."
type: "post"
---

# Tokenised sukuk, explained in plain English

*October 10, 2026 · by Iftikar*

A note before you read: this post is educational only, not investment advice. Nothing here is a recommendation to buy, sell, hold, or use any company's products. Companies are named as examples, not endorsements. I am not a licensed financial advisor, and AI-assisted research can contain mistakes. Do your own research and consult a qualified professional before investing.

## What a tokenised sukuk is

Start with a regular sukuk. A sukuk is a certificate tied to a real asset — a building, a road, a pool of leases. Investors put money in, the asset earns profit, and investors get a share of that profit. Returns come from the asset, never from interest.

A tokenised sukuk records that same certificate as digital tokens on a blockchain, instead of as entries in a bank's clearing system. Each token represents a slice of the sukuk and works as the ownership record — Franklin Templeton's tokenised fund describes its tokens exactly this way, as a secure record of who owns which fund shares. [The Fintech Times](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/) Buying, holding, and selling happen on the blockchain ledger, which every participant can inspect.

The payment terms are written as smart contracts — programs on the blockchain that carry out the sukuk's rules automatically. When a profit payment is due, the program sends it to each token holder.

## What "settlement" means, and what changes

Settlement is the moment a trade actually finishes. Two things have to happen: the buyer's money reaches the seller, and the ownership record moves from the seller's name to the buyer's. Until both are done, the trade is still open.

With a regular sukuk, finishing takes a chain of middlemen. Your broker talks to a custodian bank that holds the certificate, and a clearing house such as Euroclear or Clearstream updates the official records. Each party checks and records its own step. The full chain usually takes two business days — the industry calls this T+2.

With a tokenised sukuk, the token is the ownership record, so there is no separate chain of custodians keeping separate records. A smart contract moves the token to the buyer's wallet and sends the payment to the seller in one step, on the blockchain. Settlement drops from two days to minutes, and the ledger shows the new owner immediately.

## The technology underneath

Two companies, two jobs.

**ADI Chain** is the blockchain the tokens would run on. It is a Layer-2 network on Ethereum built by Abu Dhabi's ADI Foundation: transactions run on ADI's own fast chain, and cryptographic proofs are posted back to Ethereum so the results inherit Ethereum's security. It uses zero-knowledge proofs (the zkSync stack with a prover called Airbender), processes up to about 15,000 transactions per second, and runs standard Ethereum smart contracts, so existing token code works on it without being rewritten. [MEXC](https://blog.mexc.com/what-is-adi-chain-adi-the-institutional-layer-2-for-stablecoins-and-rwas/) It operates under Abu Dhabi Global Market's regulatory framework. [Tech Times](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm) The same chain already carries a UAE central-bank-licensed dirham stablecoin — Abu Dhabi's IHC group moved $30 million with it in 2026. [BitcoinWorld](https://bitcoinworld.co.in/abu-dhabis-ihc-executes-landmark-30m-transaction-using-dirham-pegged-stablecoin/) In September 2026, Securitize — a US firm registered with the SEC as a broker-dealer and transfer agent — integrated ADI Chain for its tokenised funds. [Tech Times](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm)

**Tokinvest** is the regulated-issuance half. It is a Dubai company licensed by VARA, the UAE's virtual-asset regulator — in September 2025 it received VARA's first multi-asset issuance licence. [BeInCrypto](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/) It was founded in 2024 by Scott Thiel and Matt Blom and raised $3.2 million in early funding. [BeInCrypto](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/) Its job in any deal runs in fixed steps: select the asset, set up the legal structure, create the tokens, check each investor's identity, then record who owns what as the transfer agent. Investors fund a wallet, buy fractional tokens, and receive payouts as the asset earns. [The Ref Brief](https://www.therefibrief.com/p/tokinvest-s-2b-tokenization-plan-prime-real-estate-for-all) It has done this before: Franklin Templeton's tokenised money-market fund (run on Franklin's Benji platform, connected through a network called Synthesys), a digital bond issued in Luxembourg, tokenised UK residential property, and a tokenised racehorse. [The Fintech Times](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/) [BeInCrypto](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/)

## The $100 million deal, in plain terms

On October 6, 2026, the ADI Foundation and Tokinvest signed an agreement to work toward a $100 million tokenised sukuk. [GCC Business News](https://www.gccbusinessnews.com/adi-foundation-and-tokinvest-collaboration/) The plan: take existing sukuk issued by UAE entities, convert them into tokens on ADI Chain, and sell them through regulated distribution partners. [Finance News International](https://www.financenewsint.com/articles/adi-foundation-tokinvest-sign-mo-u-targeting-100-million-tokenized-sukuk) The distribution stays inside regulated channels rather than open crypto markets. The partnership also covers other assets later — private credit, funds, and other yield-generating products. [Arab Times](https://arabtimesnews.com/adi-foundation-tokinvest-collaborate-on-100-million-tokenised-sukuk/)

One fact to keep straight: as of October 2026, no sukuk has been issued under this agreement. The October 6 document is a memorandum of understanding — a formal agreement to explore and build the framework. The $100 million is the goal the two sides announced, not a completed deal.

## How the same could be built in the USA

The technology is the straightforward part. The licenses are the hard part. Five pieces are needed.

**1. The sukuk itself.** Tokenisation changes nothing here. You still need a real asset, a legal structure to hold it, and Shariah scholars to certify it under AAOIFI rules.

**2. The tokens.** The industry uses a token standard called ERC-3643, where each token checks the holder's identity before it can move. Only investors who passed identity checks can hold or receive the tokens. [Tech Times](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm)

**3. A blockchain to run on.** Any Ethereum-compatible chain works. Payments between investors settle in dollar stablecoins.

**4. Permission to sell it.** In the US, a token that represents a security is treated as a security. The SEC and CFTC said in January 2026 that tokenisation changes a security's form, not its legal status. [CoinDesk](https://www.coindesk.com/business/2026/09/17/sec-opens-door-to-tokenized-u-s-stock-trading-here-s-who-could-benefit) So the issuer must register the offering with the SEC or use an exemption. Most tokenised offerings use Regulation D, which limits sales to accredited investors, or Regulation S for sales outside the US — an exemption is still required; there is no shortcut around it. [Securities Lawyer 101](https://www.securitieslawyer101.com/2026/09/18/sec-tokenized-stocks-exemption-otc-markets/)

**5. A place to trade later.** Tokens need a licensed venue to change hands — in the US that means an Alternative Trading System or a broker-dealer platform. In September 2026 the SEC opened a five-year Innovation Exemption letting tokenised-securities venues operate without registering as an exchange, aimed at exactly this kind of trading. [Davis Polk](https://www.davispolk.com/insights/client-update/sec-s-innovation-exemption-opens-path-tokenized-stock-trading)

The US already has a company playing Tokinvest's role. Securitize is registered with the SEC as a broker-dealer and transfer agent and handles about $5 billion in tokenised assets for clients including BlackRock and KKR. [Tech Times](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm) So the American version of this deal would pair a firm like Securitize with a Shariah-compliant sukuk structure. The missing piece is not technology or licenses — it is an issuer willing to build it.

## Can you buy one today?

Not as an ordinary investor. No tokenised sukuk product is currently offered to retail buyers in the USA, UK, EU, or Australia. The activity so far is institutional: earlier in 2026, Malaysia's sovereign wealth fund Khazanah issued a RM100 million tokenised sukuk with CIMB and Maybank participating, sold to institutions. [ainvest](https://www.ainvest.com/news/sukuk-token-cimb-put-money-ledger-2608/)

A learner who wants sukuk exposure now buys regular sukuk funds instead — the [sukuk guide](/lab/sukuk-guide.html) lists verified options.

## Sources

- [GCC Business News: ADI Foundation and Tokinvest unite on $100mn tokenised sukuk](https://www.gccbusinessnews.com/adi-foundation-and-tokinvest-collaboration/) (Oct 6, 2026)
- [Finance News International: ADI Foundation and Tokinvest target $100M tokenized sukuk](https://www.financenewsint.com/articles/adi-foundation-tokinvest-sign-mo-u-targeting-100-million-tokenized-sukuk) (Oct 8, 2026)
- [Arab Times: ADI Foundation, Tokinvest collaborate on $100M tokenised sukuk](https://arabtimesnews.com/adi-foundation-tokinvest-collaborate-on-100-million-tokenised-sukuk/) (Oct 6, 2026)
- [MEXC: What is ADI Chain — the institutional Layer-2 for stablecoins and RWAs](https://blog.mexc.com/what-is-adi-chain-adi-the-institutional-layer-2-for-stablecoins-and-rwas/) (May 2026)
- [Tech Times: Securitize integrates ADI Chain](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm) (Sep 30, 2026)
- [BitcoinWorld: IHC executes $30M dirham stablecoin transaction on ADI Chain](https://bitcoinworld.co.in/abu-dhabis-ihc-executes-landmark-30m-transaction-using-dirham-pegged-stablecoin/) (May 2026)
- [The Fintech Times: Tokinvest welcomes Franklin Templeton and Synthesys](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/) (Jun 2026)
- [BeInCrypto: Tokinvest x Singularry — VARA licence, founders, funding](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/) (Oct 2025)
- [The Ref Brief: Tokinvest's tokenization plan — how investing works](https://www.therefibrief.com/p/tokinvest-s-2b-tokenization-plan-prime-real-estate-for-all) (Jan 2026)
- [CoinDesk: SEC opens door to tokenized US stock trading](https://www.coindesk.com/business/2026/09/17/sec-opens-door-to-tokenized-u-s-stock-trading-here-s-who-could-benefit) (Sep 17, 2026)
- [Davis Polk: SEC's Innovation Exemption opens a path for tokenized stock trading](https://www.davispolk.com/insights/client-update/sec-s-innovation-exemption-opens-path-tokenized-stock-trading) (Oct 6, 2026)
- [Securities Lawyer 101: exemptions still required for tokenized issuance](https://www.securitieslawyer101.com/2026/09/18/sec-tokenized-stocks-exemption-otc-markets/) (Sep 18, 2026)
- [ainvest: Khazanah's RM100M tokenized sukuk and CIMB's on-chain settlement](https://www.ainvest.com/news/sukuk-token-cimb-put-money-ledger-2608/) (Aug 2026)

---

*For educational purposes only — not investment advice. Nothing here is a recommendation to buy, sell, or hold any security. Iftikar is not a licensed financial advisor. AI-assisted content can contain mistakes; do your own research and consult a qualified professional before making financial decisions.*
