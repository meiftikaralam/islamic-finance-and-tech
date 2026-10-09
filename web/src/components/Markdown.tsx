import ReactMarkdown from "react-markdown";
import type { ReactNode } from "react";
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

/** Renders edition/post/page markdown with the site's reading styles. */
export function Markdown({ body, className }: { body: string; className?: string }) {
  return (
    <div className={cn("prose-blog", className)}>
      <ReactMarkdown
      components={{
        p({ children }) {
          const t = textOf(children);
          if (t.startsWith("What to learn:") || t.startsWith("Why it matters:")) {
            return (
              <div className="bg-brand-50 border-l-4 border-brand-600 px-3.5 py-2.5 rounded-r-lg my-4 text-[15px] leading-[1.7] text-[#333]">
                {children}
              </div>
            );
          }
          if (t.startsWith("🔗 Source:") || t.startsWith("Source:")) {
            return <p className="text-sm my-3">{children}</p>;
          }
          return <p>{children}</p>;
        },
        a({ href, children }) {
          const external = href?.startsWith("http");
          // Root-absolute links in markdown content need the serving subpath.
          const fixed = !external && href?.startsWith("/") ? withBase(href) : href;
          return (
            <a href={fixed} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {children}
            </a>
          );
        },
      }}
    >
      {body}
      </ReactMarkdown>
    </div>
  );
}
