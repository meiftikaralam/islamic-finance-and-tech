import { Link } from "react-router-dom";

/** About page: hero with Iftikar's photo, his Option 2 bio (verbatim),
    a stats strip drawn from that bio, his "About this blog" letter,
    start-here links, and the content note. */

const STATS = [
  { value: "14+ years", label: "building enterprise systems" },
  { value: "7+ years", label: "payment infrastructure at Amazon" },
  { value: "1.6M", label: "customers on the co-branded card" },
  { value: "140 TB+", label: "of data in his pipelines" },
];

const START_HERE = [
  {
    href: "/lab/sukuk-guide.html",
    title: "Sukuk, finally explained: the beginner's guide I wish I'd had",
  },
  {
    href: "/lab/shariah-etf-guide.html",
    title: "ETFs, explained: what they are, what makes one Shariah, and the tech underneath",
  },
  { href: "/lab/tokenised-sukuk-explained.html", title: "Tokenised sukuk" },
  {
    href: "/lab/halal-robo-advisors.html",
    title: "Halal robo-advisors, explained: what they are and who's actually offering one",
  },
];

export function About() {
  return (
    <article className="prose-blog">
      {/* Hero: name and credential lines. No photo yet — the only image
          on file is a grey placeholder silhouette, not a real photo. */}
      <div className="mt-6 mb-2">
        <div>
          <h1 className="mt-0 mb-1">Iftikar</h1>
          <p className="my-1 font-sans text-[17px] leading-snug text-[#555]">
            7 years in payment software · years of Islamic finance research
          </p>
          <p className="my-1 font-sans text-[17px] leading-snug text-[#555]">
            Plain-English lessons on Islamic banking, sukuk, halal investing,
            and the technology behind them.
          </p>
        </div>
      </div>

      <h2>About Iftikar</h2>
      <p>
        Welcome to the blog. Iftikar is passionate about researching Islamic
        finance and the engineering behind real-world Islamic financial
        products. Over the years, he has advised financial institutions on
        simplifying Islamic product workflows and worked closely with Shariah
        scholars to develop and launch Islamic financing solutions
        internationally.
      </p>
      <p>
        In his engineering career, he has spent over 14 years building
        enterprise distributed systems, including 7+ years developing critical
        payment infrastructure at Amazon. There, he helped launch a
        co-branded credit card program for 1.6 million customers, built
        payment processing for cashier-less &quot;just walk out&quot; stores,
        worked on payment fraud detection, and architected data pipelines
        processing more than 140 TB of data.
      </p>
      <p>
        Regularly, he writes plain-English lessons breaking down Islamic
        banking, sukuk, halal investing, and the production system designs
        behind them—offered fi sabilillah for fellow builders, founders, and
        learners. Every lesson is human-written and verified, with AI used
        only as an assistant.
      </p>
      <p>
        Questions, corrections, or architecture discussions are always
        welcome:{" "}
        <a href="mailto:iftikar@islamicfintech.org">
          iftikar@islamicfintech.org
        </a>
      </p>

      {/* Stats strip: every number comes from the bio above. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {STATS.map((s) => (
          <div
            key={s.value}
            className="flex items-center gap-3 rounded-xl border border-[#E9E0CE] bg-white px-4 py-3.5 text-left lg:flex-col lg:items-center lg:gap-0 lg:py-4 lg:text-center"
          >
            <p
              className="m-0 shrink-0 text-[24px] leading-tight font-bold lg:text-[26px]"
              style={{ color: "#C2410C", fontFamily: "Inter, sans-serif" }}
            >
              {s.value}
            </p>
            <p
              className="m-0 text-[15px] leading-snug lg:mt-1 lg:text-[14px]"
              style={{ color: "#555", fontFamily: "Inter, sans-serif" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <h2>About this blog</h2>
      <p>Dear readers,</p>
      <p>
        This blog exists to educate people about Islamic finance — and the
        technology being developed and adopted to bring Islamic financing
        into production.
      </p>
      <p>
        Nothing here is for commercial purposes. It is purely educational,
        written especially for those from a finance background, and for
        anyone trying to set up an Islamic finance startup or institution.
        My hope is that this knowledge helps you understand how industry
        practitioners are adopting technology to bring Islamic finance to
        market — and makes it easier for you to build Islamic finance
        products of your own.
      </p>
      <p>
        The site is growing into a small course library. The first module is
        a deep-dive into the{" "}
        <Link to="/aaoifi/index.html">AAOIFI Shariah Standards</Link> — all
        62 standards in simple English, free for learning, teaching, and
        research. More modules will follow the same format: plain language,
        verified sources, no filler.
      </p>
      <p>
        Alongside the daily newsletter, I will also share publicly
        available information about the technologies used by different
        financial institutions — including artificial intelligence: AI
        agents, LLM-based systems, AI-assisted development, knowledge
        bases, and more. All of it will be freely accessible to everyone,
        by the will of Allah.
      </p>
      <p>
        My purpose in doing this is for the sake of Allah alone — not for
        monetization in any form. This blog is, and will remain, for
        educational purposes.
      </p>

      <h2>Start here</h2>
      <div className="my-4 not-prose">
        {START_HERE.map((p) => (
          <Link
            key={p.href}
            to={p.href}
            className="block rounded-xl border border-[#E9E0CE] bg-white px-4 py-3.5 mb-3 no-underline hover:border-brand-600"
          >
            <span className="font-sans text-[17px] font-semibold leading-snug text-brand-700">
              {p.title}
            </span>
          </Link>
        ))}
      </div>

      <h2>A note on the content</h2>
      <p>
        Most of the notes and content on this site are generated or updated
        with the help of AI, so there may be mistakes. If you have any
        concern about the content of this website, please feel free to reach
        out at{" "}
        <a href="mailto:iftikar@islamicfintech.org">
          iftikar@islamicfintech.org
        </a>
        .
      </p>
      <p>
        Your concerns, feedback, and reviews are genuinely welcome — they
        help improve the content on a continuous basis. Thank you so much,
        and please enjoy reading.
      </p>
      <p>
        <em>
          Not investment advice: everything on this site — the newsletter,
          the glossary, and the posts — is for educational purposes only.
          Nothing here is financial advice or a recommendation to buy, sell,
          or hold any security. I am not a licensed financial advisor.
          Please do your own research and consult a qualified professional
          before making financial decisions.
        </em>
      </p>
    </article>
  );
}
