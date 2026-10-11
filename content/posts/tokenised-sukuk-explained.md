---
title: "Tokenised sukuk"
date: "2026-10-11"
description: "What a tokenised sukuk is, how settlement works, the ADI Chain and Tokinvest real-world example, and how the same could be built in the USA."
type: "post"
---

# Tokenised sukuk

In this post, we will explain what a tokenised sukuk is and some of the technical details behind it. First of all, let us understand what a sukuk is. A sukuk is a certificate tied to a real asset. The asset can be a building, a road, or a pool of leases. Investors put money into the asset through this certificate. The asset earns profit, and each investor gets a share of that profit based on how much they invested. The return comes from the asset. It has nothing to do with riba or interest.

With a regular sukuk, finishing a trade takes a chain of middlemen. Let me explain who they are. You, the buyer, go to a broker. The broker talks to a custodian bank. The custodian bank is the one holding the certificate on your behalf. Then a clearing house, such as Euroclear or Clearstream, updates the official record. A clearing house is the central bookkeeper. It keeps the master list of who owns which certificate, and after every trade it rewrites that list. Each party checks its own step and writes it in its own books. The full chain usually takes two business days, sometimes more. The industry calls this T+2.

A tokenised sukuk differs in the way certificates are stored and distributed. Instead of entries in a bank's clearing system, a tokenised sukuk records that same certificate as digital tokens on a blockchain, which is a shared digital notebook that records information across many computers at the same time, so no one can change or erase it. Each token represents a slice of the sukuk and works as the ownership record. For example, Franklin Templeton's tokenised fund manages its tokens exactly this way, as a secure record of who owns which fund shares. Buying, holding, and selling happen on the blockchain ledger, which every participant can inspect.

With a tokenised sukuk, the token itself is the ownership record. So there is no separate chain of custodians keeping separate records. The payment terms are written as smart contracts. A smart contract moves the token to the buyer's wallet and sends the payment to the seller in one step, on the blockchain. Settlement drops from two days to minutes, and the ledger shows the new owner immediately.

**The technology underneath: real world example**

Let me explain how a tokenised sukuk works using real technology. I will take a real example, from news dated October 6, where the ADI Foundation and Tokinvest signed an agreement to work toward a $100 million tokenised sukuk.

In this example, ADI Chain is the blockchain the tokens would run on. It is a Layer-2 network on Ethereum, built by Abu Dhabi's ADI Foundation. Transactions run on ADI's own fast chain, and cryptographic proofs are posted back to Ethereum, so the results inherit Ethereum's security. It uses zero-knowledge proofs. The zkSync stack has a prover called Airbender, and the chain processes up to about 15,000 transactions per second. It runs standard Ethereum smart contracts, so existing token code works on it without being rewritten. It operates under the Abu Dhabi Global Market regulatory framework.

Tokinvest is the regulated issuance hub in this deal. It is a Dubai company licensed by VARA, the UAE's virtual-asset regulator. In September 2025 it received VARA's first multi-asset issuance licence. It was founded in 2024 by Scott Thiel and Matt Blom and raised $3.2 million in early funding.

For any deal/trade it runs a few fixed steps. It selects the asset, sets up the legal structure, creates the tokens, checks each investor's identity, then records who owns what as the transfer agent. Investors fund a wallet, buy fractional tokens, and receive payouts as the asset earns. Franklin Templeton's tokenised money-market fund works in a similar way: run on Franklin's Benji platform and connected through a network called Synthesys.

With the $100 million deal, it will take existing sukuk issued by UAE entities, convert them into tokens on ADI Chain, and sell them through regulated distribution partners. The distribution stays inside regulated channels rather than open crypto markets. The partnership also covers other assets later: private credit, funds, and other yield-generating products.

**How the same could be built in the USA?**

To build this in the USA, the technology is the easy part. The licences are the hard part.

First, the sukuk itself. Tokenisation changes nothing here. You still need a real asset, a legal structure to hold it, and Shariah scholars to certify it under AAOIFI rules.

Second, the tokens. The industry uses a token standard called ERC-3643, where each token checks the holder's identity before it can move. Only investors who passed identity checks can hold or receive the tokens.

Third, a blockchain to run on. Any Ethereum-compatible chain works, and payments between investors settle in dollar stablecoins.

Fourth, permission to sell it. In the US, a token that represents a security is treated as a security. The SEC and CFTC said in January 2026 that tokenising a security does not change its legal status. So the issuer must register the offering with the SEC or use an exemption. Most tokenised offerings use Regulation D, which limits sales to accredited investors, or Regulation S for sales outside the US.

Fifth, a place to trade later. Tokens need a licensed venue to change hands. In the US that means an Alternative Trading System or a broker-dealer platform. In September 2026 the SEC opened a five-year Innovation Exemption letting tokenised-securities venues operate without registering as an exchange, aimed at exactly this kind of trading.

No tokenised sukuk product is currently offered to retail buyers in the USA, UK, EU, or Australia. The activity so far is under research. Earlier in 2026, Malaysia's sovereign wealth fund Khazanah issued a RM100 million tokenised sukuk with CIMB and Maybank participating, sold to institutions.

A learner who wants sukuk exposure now buys regular sukuk funds instead. The sukuk guide lists verified options.

---

*For educational purposes only — not investment advice. Nothing here is a recommendation to buy, sell, or hold any security. Iftikar is not a licensed financial advisor. AI-assisted content can contain mistakes; do your own research and consult a qualified professional before making financial decisions.*
