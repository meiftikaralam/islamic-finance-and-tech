---
title: "Tokenised sukuk, explained in plain English"
date: "2026-10-11"
description: "What a tokenised sukuk is, what settlement means, the tech inside the $100M ADI Foundation–Tokinvest deal, and how the same could be built in the USA."
type: "post"
---

# Tokenised sukuk, explained in plain English

*October 11, 2026 · by Iftikar*

A note before you read: this post is educational only, not investment advice. Nothing here is a recommendation to buy, sell, hold, or use any company's products. Companies are named as examples, not endorsements. I am not a licensed financial advisor, and AI-assisted research can contain mistakes. Do your own research and consult a qualified professional before investing.

## What a tokenised sukuk is

In this post, we will explain what a tokenised sukuk is and some of the technical details behind it. First of all, let us understand what a sukuk is. A sukuk is a certificate tied to a real asset. The asset can be a building, a road, or a pool of leases. Investors put money into the asset through this certificate. The asset earns profit, and each investor gets a share of that profit based on how much they invested. The return comes from the asset. It has nothing to do with riba or interest.

A tokenised sukuk records that same certificate as digital tokens on a blockchain, instead of as entries in a bank's clearing system. A blockchain is a shared digital ledger that every participant can inspect and no single party controls. Each token represents a slice of the sukuk and works as the ownership record. Franklin Templeton's tokenised fund describes its tokens exactly this way, as a secure record of who owns which fund shares. [The Fintech Times](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/) Buying, holding, and selling happen on the blockchain ledger, which every participant can inspect.

The payment terms are written as smart contracts. A smart contract is a program on the blockchain that carries out the sukuk's rules automatically. When a profit payment is due, the program sends it to each token holder.

## What settlement means

In this process we come across settlement. Settlement is the moment a trade actually finishes. Two things have to happen. The buyer's money reaches the seller. And the ownership record moves from the seller's name to the buyer's name. Until both are done, the trade is still open.

With a regular sukuk, finishing a trade takes a chain of middlemen. Let me explain who they are. You, the buyer, go to a broker. The broker talks to a custodian bank. The custodian bank is the one holding the certificate on your behalf. Then a clearing house, such as Euroclear or Clearstream, updates the official record. A clearing house is the central bookkeeper. It keeps the master list of who owns which certificate, and after every trade it rewrites that list. Each party checks its own step and writes it in its own books. The full chain usually takes two business days, sometimes more. The industry calls this T+2.

With a tokenised sukuk, the token itself is the ownership record. So there is no separate chain of custodians keeping separate records. A smart contract moves the token to the buyer's wallet and sends the payment to the seller in one step, on the blockchain. Settlement drops from two days to minutes, and the ledger shows the new owner immediately.

## The technology underneath: ADI Chain

Let me explain how a tokenised sukuk works using real technology. I will take a real example. On October 6, the ADI Foundation and Tokinvest signed an agreement to work toward a $100 million tokenised sukuk. [GCC Business News](https://www.gccbusinessnews.com/adi-foundation-and-tokinvest-collaboration/)

In this example, ADI Chain is the blockchain the tokens would run on. It is a Layer-2 network on Ethereum, built by Abu Dhabi's ADI Foundation. Transactions run on ADI's own fast chain, and cryptographic proofs are posted back to Ethereum, so the results inherit Ethereum's security. It uses zero-knowledge proofs. The zkSync stack has a prover called Airbender, and the chain processes up to about 15,000 transactions per second. It runs standard Ethereum smart contracts, so existing token code works on it without being rewritten. It operates under the Abu Dhabi Global Market regulatory framework. [MEXC](https://blog.mexc.com/what-is-adi-chain-adi-the-institutional-layer-2-for-stablecoins-and-rwas/)

## Tokinvest: the regulated issuance hub

Tokinvest is the regulated issuance hub in this deal. It is a Dubai company licensed by VARA, the UAE's virtual-asset regulator. In September 2025 it received VARA's first multi-asset issuance licence. [BeInCrypto](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/) It was founded in 2024 by Scott Thiel and Matt Blom and raised $3.2 million in early funding. [BeInCrypto](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/)

Its job in any deal runs in fixed steps. It selects the asset, sets up the legal structure, creates the tokens, checks each investor's identity, then records who owns what as the transfer agent. Investors fund a wallet, buy fractional tokens, and receive payouts as the asset earns. It has done this before: Franklin Templeton's tokenised money-market fund, run on Franklin's Benji platform and connected through a network called Synthesys. [The Fintech Times](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/)

## The $100 million deal, in plain terms

The plan: take existing sukuk issued by UAE entities, convert them into tokens on ADI Chain, and sell them through regulated distribution partners. [Finance News International](https://www.financenewsint.com/articles/adi-foundation-tokinvest-sign-mo-u-targeting-100-million-tokenized-sukuk) The distribution stays inside regulated channels rather than open crypto markets. The partnership also covers other assets later: private credit, funds, and other yield-generating products. [Arab Times](https://arabtimesnews.com/adi-foundation-tokinvest-collaborate-on-100-million-tokenised-sukuk/)

One fact to keep straight: as of October 2026, no sukuk has been issued under this agreement. The October 6 document is a memorandum of understanding, a formal agreement to explore and build the framework. The $100 million is the goal the two sides announced. No deal has closed yet.

## How the same could be built in the USA

If you want to build this in the USA, the technology is the easy part. The licences are the hard part.

First, the sukuk itself. Tokenisation changes nothing here. You still need a real asset, a legal structure to hold it, and Shariah scholars to certify it under AAOIFI rules.

Second, the tokens. The industry uses a token standard called ERC-3643, where each token checks the holder's identity before it can move. Only investors who passed identity checks can hold or receive the tokens. [Tech Times](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm)

Third, a blockchain to run on. Any Ethereum-compatible chain works, and payments between investors settle in dollar stablecoins.

Fourth, permission to sell it. In the US, a token that represents a security is treated as a security. The SEC and CFTC said in January 2026 that tokenising a security does not change its legal status. [CoinDesk](https://www.coindesk.com/business/2026/09/17/sec-opens-door-to-tokenized-u-s-stock-trading-here-s-who-could-benefit) So the issuer must register the offering with the SEC or use an exemption. Most tokenised offerings use Regulation D, which limits sales to accredited investors, or Regulation S for sales outside the US. [Securities Lawyer 101](https://www.securitieslawyer101.com/2026/09/18/sec-tokenized-stocks-exemption-otc-markets/)

Fifth, a place to trade later. Tokens need a licensed venue to change hands. In the US that means an Alternative Trading System or a broker-dealer platform. In September 2026 the SEC opened a five-year Innovation Exemption letting tokenised-securities venues operate without registering as an exchange, aimed at exactly this kind of trading. [Davis Polk](https://www.davispolk.com/insights/client-update/sec-s-innovation-exemption-opens-path-tokenized-stock-trading)

## Can you buy one today?

Not as an ordinary investor. No tokenised sukuk product is currently offered to retail buyers in the USA, UK, EU, or Australia. The activity so far is institutional: earlier in 2026, Malaysia's sovereign wealth fund Khazanah issued a RM100 million tokenised sukuk with CIMB and Maybank participating, sold to institutions. [ainvest](https://www.ainvest.com/news/sukuk-token-cimb-put-money-ledger-2608/)

A learner who wants sukuk exposure now buys regular sukuk funds instead. The [sukuk guide](/lab/sukuk-guide.html) lists verified options.

## Sources

- [GCC Business News: ADI Foundation and Tokinvest unite on $100mn tokenised sukuk](https://www.gccbusinessnews.com/adi-foundation-and-tokinvest-collaboration/) (Oct 6, 2026)
- [Finance News International: ADI Foundation and Tokinvest target $100M tokenized sukuk](https://www.financenewsint.com/articles/adi-foundation-tokinvest-sign-mo-u-targeting-100-million-tokenized-sukuk) (Oct 8, 2026)
- [Arab Times: ADI Foundation, Tokinvest collaborate on $100M tokenised sukuk](https://arabtimesnews.com/adi-foundation-tokinvest-collaborate-on-100-million-tokenised-sukuk/) (Oct 6, 2026)
- [MEXC: What is ADI Chain — the institutional Layer-2 for stablecoins and RWAs](https://blog.mexc.com/what-is-adi-chain-adi-the-institutional-layer-2-for-stablecoins-and-rwas/) (May 2026)
- [Tech Times: Securitize integrates ADI Chain](https://www.techtimes.com/articles/328344/20260930/securitize-integrates-adi-chain-tokenized-blackrock-funds-now-have-uae-sovereign-rails.htm) (Sep 30, 2026)
- [The Fintech Times: Tokinvest welcomes Franklin Templeton and Synthesys](https://thefintechtimes.com/tokinvest-welcomes-franklin-templeton-and-synthesys-to-expand-institutional-rwa-pipeline-in-the-middle-east/) (Jun 2026)
- [BeInCrypto: Tokinvest x Singularry — VARA licence, founders, funding](https://beincrypto.com/tokinvest-singularry-defai-rwa-partnership/) (Oct 2025)
- [CoinDesk: SEC opens door to tokenized US stock trading](https://www.coindesk.com/business/2026/09/17/sec-opens-door-to-tokenized-u-s-stock-trading-here-s-who-could-benefit) (Sep 17, 2026)
- [Davis Polk: SEC's Innovation Exemption opens a path for tokenized stock trading](https://www.davispolk.com/insights/client-update/sec-s-innovation-exemption-opens-path-tokenized-stock-trading) (Oct 6, 2026)
- [Securities Lawyer 101: exemptions still required for tokenized issuance](https://www.securitieslawyer101.com/2026/09/18/sec-tokenized-stocks-exemption-otc-markets/) (Sep 18, 2026)
- [ainvest: Khazanah's RM100M tokenized sukuk and CIMB's on-chain settlement](https://www.ainvest.com/news/sukuk-token-cimb-put-money-ledger-2608/) (Aug 2026)

---

*For educational purposes only — not investment advice. Nothing here is a recommendation to buy, sell, or hold any security. Iftikar is not a licensed financial advisor. AI-assisted content can contain mistakes; do your own research and consult a qualified professional before making financial decisions.*
