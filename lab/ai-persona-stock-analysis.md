# Experiment: asking AI to value stocks like Buffett and Graham

*October 7, 2026 · by Iftikar*
(function(){ var box=document.getElementById('site-search'), res=document.getElementById('search-results'); if(!box) return; fetch('../search.json').then(function(r){return r.json();}).then(function(idx){ box.addEventListener('input',function(){ var q=box.value.trim().toLowerCase(); if(q.length<2){res.innerHTML='';return;} var hits=idx.filter(function(e){return (e.title+' '+e.text).toLowerCase().indexOf(q)>=0;}).slice(0,8); res.innerHTML=hits.length?hits.map(function(h){ return '<a href="../'+h.url+'" style="display:block;background:#fff;border:1px solid #e3e3e3;border-radius:8px;padding:10px 12px;margin-bottom:6px;text-decoration:none;color:inherit;">' +'<div style="font-size:12px;color:#0f5132;font-weight:600;">'+h.type+'</div>' +'<div style="font-size:14px;font-weight:600;color:#222;">'+h.title+'</div>' +'<div style="font-size:12px;color:#666;">'+h.excerpt+'</div></a>'; }).join(''):'<div style="font-size:13px;color:#888;">No matches.</div>'; }); }); })();

> **⚠️ Educational purposes only — not investment advice.** Everything in the Lab is a learning experiment. Nothing here is a recommendation to buy, sell, or hold any security. I am not a licensed financial advisor, and AI-generated analysis can be wrong. Always do your own research and consult a qualified professional before making any financial decision.

Recently I started experimenting with an AI agent for stock analysis — not to get stock tips, but to learn *how great investors think*.

## What I did

I picked a stock and gave it to the AI agent with a specific instruction: **analyze this company the way Warren Buffett would.** Estimate the intrinsic value of the business — what it is actually worth based on its earnings power — and tell me whether the current price looks overpriced or underpriced compared to that value. And crucially: **explain every term properly** along the way, so the analysis itself becomes a lesson.

Then I ran the same exercise through a second persona: **Benjamin Graham**, Buffett's teacher and the father of value investing — the quantitative, no-nonsense lens of *Mr. Market*, net-nets, and demanding a margin of safety before paying for anything.

**A correction to my own method — one I should have stated upfront:** before any valuation work, the stock must first pass a Shariah-compliance screen. For a Muslim investor, the order matters: **halal check first, intrinsic-value analysis second.** There is no point finding a wonderful undervalued business you cannot own. So the real workflow is: screen for compliance (using tools like the screening data I covered in my [Zoya API deep-dive](zoya-finance-api.html)), *then* ask what Buffett or Graham would pay for it.

## Why personas?

Because the point was never the verdict on one stock. The point was the *method*:

- **Buffett's lens** asks: is this a wonderful business at a fair price? What is its intrinsic value — the cash it can realistically generate over its lifetime, discounted back to today?
- **Graham's lens** asks: where is the margin of safety? Am I paying far less than the business is worth, so that even if I'm wrong, I'm protected?

Learning to ask those two questions — in the right order, with the right terminology — is learning to think about investing smartly. That is the skill I want to build, and to share.

## What the agent actually did

For each stock, the agent walked through the financials step by step: revenue and earnings trends, free cash flow, debt levels, valuation ratios — and translated each one into plain language. Every piece of jargon got a proper explanation, because an analysis you can't understand is an analysis you can't learn from.

After the first runs, I started applying the same approach to a few more stock profiles, comparing how the two personas weighed the same company differently. Those write-ups will appear here as the experiment continues.

## Where this is going

This is experimental, and I'm learning in public. The goal is to show — practically, hands-on — how an ordinary person can use AI to study investing the way the masters do it: carefully, quantitatively, and with humility about what you don't know.

If you try this yourself, start with the questions, not the answers: *What is this business worth? Why? What could I be missing?*

> **⚠️ Please read:** This experiment is strictly educational. I have no intention of promoting any stock or investment — any companies mentioned are examples for learning, not endorsements. I am not a financial advisor, this is not financial advice, and AI analysis frequently makes mistakes. Past performance never guarantees future results. Do your own research, and talk to a licensed professional before investing.

> (I'm not a lawyer — these are standard educational disclaimers, written in plain language to keep things honest.)
