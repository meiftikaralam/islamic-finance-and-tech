# ETFs, explained: what they are, what makes one Shariah, and the tech underneath

*October 7, 2026 · by Iftikar*
## It started in 2007

In 2007, BNP Paribas launched the world's first Islamic ETF. That same year, iShares followed with three of its own: Islamic ETFs tracking world, US, and emerging-market stocks. They were tiny at the time. The idea behind them turned out to be durable, and the mechanics are worth understanding.

## What is an ETF

An ETF (exchange-traded fund) is a basket of investments you buy in a single trade. Instead of buying 200 stocks one by one, you buy one share of a fund that holds all 200. The fund's price moves with the combined value of everything inside it. You can buy and sell it on a stock exchange during market hours, just like a stock.

## How it differs from buying stocks

When you buy a stock, you own one company. When you buy an ETF share, you own a slice of everything the fund holds. Three practical differences:

- **Diversification:** one purchase spreads your money across many companies instead of one.
- **Cost:** most ETFs are passive. They follow an index instead of paying a manager to pick stocks, so annual fees are usually a fraction of a percent.
- **Effort:** you don't research 200 companies. You research one fund: what index it follows, what it holds, what it costs.

The tradeoff: you give up control. You can't remove one company you dislike. You get the whole basket.

## The risks

- **Market risk:** if the stocks inside fall, your ETF falls. Diversification softens single-company blows, not market-wide ones.
- **Tracking error:** the fund can drift from the index it follows, so your return may not match the index exactly.
- **Sector bias:** Shariah screens exclude banks and highly leveraged companies, so Islamic ETFs lean toward technology and energy. That tilt helps some years and hurts in others.
- **Liquidity:** smaller ETFs trade less. Wide gaps between buy and sell prices cost you money.
- **Compliance drift:** a company can become non-compliant after you buy the fund. The index drops it at the next review, but there is a lag.

## What makes an ETF Shariah

A Shariah ETF is a normal ETF with one extra layer: everything inside must pass Islamic screens. Two screens run on every company:

- **Business screen:** the company's main business can't be alcohol, gambling, weapons, pork, tobacco, adult entertainment, or interest-based finance.
- **Financial screen:** even a halal business can fail on its numbers. Typical limits: debt under 33% of total assets, and income from interest or other non-compliant sources under 5% of total revenue.

The ETF itself just tracks an index built from companies that pass both screens. The Shariah work happens at the index level, not in the fund.

## Who says it's Shariah

Nobody's word is taken on trust. Each index has named scholars or firms behind it:

- **MSCI Islamic indices** (behind the iShares Islamic ETFs): methodology approved by MSCI's committee of Shariah scholars. An independent Shariah board issued a fatwa on the methodology in March 2007.
- **FTSE Shariah USA Index** (behind HLAL): screened by Yasaar, a Shariah consultancy, which issued a fatwa certifying the index.
- **Dow Jones Islamic Market Index:** overseen by its own Shariah Supervisory Board.
- **FTSE IdealRatings Islamic indices:** screened by IdealRatings, fatwa certified.

A fatwa here is a formal legal opinion, not a casual blessing. It certifies the screening method, and the scholars review compliance on an ongoing basis.

## The technology behind it

There is real technology here, in three layers.

**1. The screening engine.** The key company is **IdealRatings**, founded in San Francisco in 2006. Its software scans public filings and news on 40,000+ listed companies for non-compliant activity, then a research team checks the output against 30+ revenue streams per company. Screening runs quarterly. Its data feeds power the Bloomberg Shariah sukuk indices, the FTSE IdealRatings Islamic index series, and Russell-IdealRatings indices. This is the data layer the industry runs on.

**2. The index calculation.** MSCI, S&P, and FTSE Russell run the screens as code: business-activity filters plus financial-ratio checks, recomputed on schedule, published as indices. When a company breaches a ratio, it gets cut at the next review. This is automated and rules-based, which is why an ETF can promise to track it.

**3. The ETF plumbing.** Most Shariah ETFs use physical replication: the fund actually buys the stocks. When Microsoft grew past 13% of the MSCI World Islamic index in 2022, BlackRock had to switch its ISWD fund from sample-based tracking to full replication to keep up. Behind the scenes, authorized participants create and redeem ETF shares in bulk against baskets of the underlying stocks, which keeps the market price close to the fund's true value. At BlackRock, this all runs on their Aladdin investment platform.

## Notable Shariah ETFs

**US:**

- **SPUS — SP Funds S&P 500 Sharia Industry Exclusions ETF** (NYSE Arca, 2019). Tracks Shariah-screened S&P 500 stocks. 0.45% annual fee, around $3.3 billion in assets. The largest US-listed Islamic ETF.
- **HLAL — Wahed FTSE USA Shariah ETF** (Nasdaq, 2019). Tracks the FTSE Shariah USA Index, about 200 US companies. 0.50% annual fee, around $1 billion in assets.

**UK / EU:**

- **ISWD — iShares MSCI World Islamic UCITS ETF** (London, 2007). The one from the 2007 story. Tracks the MSCI World Islamic Index. 0.30% annual fee, physical replication.
- **ISUS — iShares MSCI USA Islamic UCITS ETF** and **ISDE — iShares MSCI Emerging Markets Islamic UCITS ETF** (London, 2007). The other two from that same launch.

Each one is the same machine: a screening engine builds the index, scholars certify the method, the ETF copies the index.

## Sources

- [Reuters: the 2007 Islamic ETF launches (BNP Paribas, iShares)](https://www.lse.co.uk/news/ISUS/us-firms-new-islamic-etf-looks-to-test-muted-investor-demand-grarsikkc3zgeyd.html)
- [iShares MSCI World Islamic UCITS ETF factsheet (ISWD)](https://www.dib.ae/docs/default-source/mutual-funds/factsheet/310326/fs-ishares-msci-world-islamic-ucits-etf.pdf?sfvrsn=fcce71f_1)
- [SPUS profile: index, fee, launch date](https://www.zacks.com/funds/etf/SPUS/profile)
- [HLAL profile: index, fee, launch date](https://www.marketbeat.com/stocks/NASDAQ/HLAL/)
- [MSCI Islamic Index Series methodology (Shariah approval, screens)](https://www-cdn.msci.com/documents/10199/8a59e89f-5134-de21-6a03-082ecfaa9e42)
- [IdealRatings: the screening data layer](https://yespress.io/idealratings)
- [ETF Stream: BlackRock's ISWD replication switch](https://www.etfstream.com/articles/blackrock-switches-tracking-methodology-on-global-islamic-etf)
- [Citi: BlackRock runs iShares ETFs on the Aladdin platform](https://www.citigroup.com/global/news/press-release/2026/blackrock-citi-select-etf-middle-office-services-aladdin)
