/** About page: About this blog, About the author, Disclaimer.
    All three sections are Iftikar's own words, verbatim. */

export function About() {
  return (
    <article className="prose-blog">
      <h1>About</h1>

      <h2>About this blog</h2>
      <p>
        Most resources on Islamic finance fall into two camps: dense legal
        texts written for scholars, or high-level summaries written for
        marketing. Neither tells you how Islamic financial products actually
        work under the hood—or how to build them in production.
      </p>
      <p>Islamic Finance and Technology exists to bridge that gap.</p>
      <p>
        This site is written for founders, software engineers, product
        builders, and finance professionals who want to understand how
        riba-free financial products are structured, regulated, and
        engineered in the real world. Whether you are launching an Islamic
        fintech startup, designing payment and ledger workflows inside an
        institution, or simply learning how halal finance works, the goal
        is to make complex structures clear and practical.
      </p>
      <p>
        Every lesson follows a simple rule: plain English, verified
        sources, and zero filler.
      </p>
      <p>
        <strong>Daily Lessons:</strong> Short, practical breakdowns of
        Islamic banking, sukuk, halal investing, and the software
        architectures and AI systems used by modern financial institutions.
      </p>
      <p>
        <strong>AAOIFI Standards Library:</strong> A growing reference
        library covering all 62 AAOIFI Shariah Standards in simple,
        accessible English—free for learning, teaching, and research.
      </p>
      <p>
        <strong>Glossary &amp; Guides:</strong> Clear definitions of key
        contracts, market structures, and screening rules without
        unnecessary jargon.
      </p>
      <p>
        There are no ads, paywalls, or paid products here — everything is
        shared freely fi sabilillah (for the sake of Allah alone) for
        anyone who wants to learn and build.
      </p>

      <h2>About the author</h2>
      <p>
        Iftikar is passionate about researching Islamic finance and the
        engineering behind Islamic finance products. Over the
        years, he has advised financial institutions on simplifying
        Islamic product workflows and worked closely with Shariah scholars
        to develop and launch Islamic financing solutions internationally.
      </p>
      <p>
        In his engineering career, he has spent over 15 years building
        enterprise distributed systems, including 7+ years developing
        critical payment infrastructure at Amazon. There, he helped launch
        a co-branded credit card program for 1.6 million customers, built
        payment processing for cashier-less &quot;just walk out&quot;
        stores, worked on payment fraud detection, and architected data
        pipelines processing more than 140 TB of data.
      </p>
      <p className="flex gap-4 items-center">
        <a
          href="https://www.linkedin.com/in/iftikar-alam-72775960/"
          aria-label="Iftikar on LinkedIn"
          className="no-underline"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/meiftikaralam"
          aria-label="Iftikar on Facebook"
          className="no-underline"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
          </svg>
        </a>
      </p>

      <h2>Disclaimer</h2>
      <p>
        Everything on this blog is for educational and informational
        purposes only. The views, architectures, and notes shared here
        belong solely to Iftikar and do not represent his employer, past or
        present clients, financial institutions, or any Shariah scholar or
        board.
      </p>
      <p>
        Although Iftikar has collaborated with Shariah scholars and advised
        institutions on product workflows, he is a software engineer—not a
        Shariah scholar, legal counsel, or licensed financial advisor.
        Nothing on this site is a formal fatwa, Shariah certification, or
        recommendation to buy, sell, or hold any financial product or
        security. Islamic finance rules and real-world implementations vary
        across scholars, jurisdictions, and institutions, so always
        consult qualified Shariah scholars and licensed professionals
        before making religious, legal, or financial decisions.
      </p>
      <p>
        Lessons are written and verified with AI used only as an
        assistant, but mistakes can still happen. If you spot an error or
        want to share feedback, please email{" "}
        <a href="mailto:iftikar@islamicfintech.org">
          iftikar@islamicfintech.org
        </a>
        .
      </p>
    </article>
  );
}
