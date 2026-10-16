import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/site";

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/** Plain-text extraction for mdast nodes (used by the remark plugin below). */
function mdastText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return typeof node.value === "string" ? node.value : "";
  if (Array.isArray(node.children)) return node.children.map(mdastText).join("");
  return "";
}

function isLinkOnlyParagraph(node: any): boolean {
  return (
    node?.type === "paragraph" &&
    Array.isArray(node.children) &&
    node.children.length === 1 &&
    node.children[0]?.type === "link"
  );
}

const CALLOUT_LEADS = ["What to learn:", "Why it matters:"];

/**
 * remark plugin: groups a "What to learn:" / "Why it matters:" paragraph with
 * the plain paragraphs that follow it, so a multi-paragraph callout renders
 * as one highlighted box instead of styling only the first paragraph.
 * Stops at headings, lists, link-only (source) paragraphs, and the disclaimer.
 */
function remarkGroupCallouts() {
  return (tree: any) => {
    const kids: any[] = Array.isArray(tree?.children) ? tree.children : [];
    const out: any[] = [];
    let i = 0;
    while (i < kids.length) {
      const node = kids[i];
      const t = node?.type === "paragraph" ? mdastText(node) : "";
      if (
        node?.type === "paragraph" &&
        CALLOUT_LEADS.some((lead) => t.startsWith(lead))
      ) {
        const group = [node];
        let j = i + 1;
        while (
          j < kids.length &&
          kids[j]?.type === "paragraph" &&
          !isLinkOnlyParagraph(kids[j]) &&
          !mdastText(kids[j]).startsWith("For educational purposes only")
        ) {
          group.push(kids[j]);
          j++;
        }
        out.push({ type: "callout", children: group, data: { hName: "callout" } });
        i = j;
      } else {
        out.push(node);
        i++;
      }
    }
    tree.children = out;
  };
}

const InCallout = createContext(false);

const CALLOUT_CLASS =
  "bg-brand-50 border-l-4 border-brand-600 px-3.5 py-2.5 rounded-r-lg my-4 text-[15px] leading-[1.7] text-[#333]";

/** Renders edition/post/page markdown with the site's reading styles. */
export function Markdown({ body, className }: { body: string; className?: string }) {
  // "callout" is a custom mdast node from remarkGroupCallouts; not a real
  // HTML tag, so the components map is cast to accept it.
  const components = {
    callout: ({ children }: any) => (
      <InCallout.Provider value={true}>
        <div className={cn(CALLOUT_CLASS, "space-y-3")}>{children}</div>
      </InCallout.Provider>
    ),
    p({ children }: any) {
      const inCallout = useContext(InCallout);
      const t = textOf(children);
      if (
        !inCallout &&
        (t.startsWith("What to learn:") || t.startsWith("Why it matters:"))
      ) {
        // Fallback for a lead paragraph the plugin didn't group (e.g. nested).
        return <div className={CALLOUT_CLASS}>{children}</div>;
      }
      if (t.startsWith("🔗 Source:") || t.startsWith("Source:")) {
        return <p className="text-sm my-3">{children}</p>;
      }
      if (t.startsWith("For educational purposes only")) {
        return (
          <div className="border border-[#e3e3e3] rounded-xl bg-[#fafafa] px-4 py-3 my-6 text-[13px] leading-[1.6] text-[#666]">
            {children}
          </div>
        );
      }
      return <p>{children}</p>;
    },
    a({ href, children }: any) {
      const external = href?.startsWith("http");
      // Root-absolute links in markdown content need the serving subpath.
      const fixed = !external && href?.startsWith("/") ? withBase(href) : href;
      return (
        <a href={fixed} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  } as any;

  return (
    <div className={cn("prose-blog", className)}>
      <ReactMarkdown remarkPlugins={[remarkGroupCallouts]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
