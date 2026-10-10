import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Newsletters } from "@/pages/Newsletters";
import { Edition } from "@/pages/Edition";
import { Post } from "@/pages/Post";
import { MdPage } from "@/pages/MdPage";
import { AaoifiIndex } from "@/pages/AaoifiIndex";
import { AaoifiStandard } from "@/pages/AaoifiStandard";
import { Glossary } from "@/pages/Glossary";
import { NotFound } from "@/pages/NotFound";
import routes from "@/generated/routes.json";

type RouteDef = {
  path: string;
  kind: string;
  slug?: string;
  title: string;
  description: string;
  date?: string;
};

function elementFor(r: RouteDef) {
  switch (r.kind) {
    case "home":
      return <Home />;
    case "newsletters":
      return <Newsletters />;
    case "edition":
      return <Edition slug={r.slug!} />;
    case "post":
      return <Post slug={r.slug!} />;
    case "page":
      return <MdPage slug={r.slug!} />;
    case "aaoifi-index":
      return <AaoifiIndex />;
    case "aaoifi-standard":
      return <AaoifiStandard slug={r.slug!} />;
    case "glossary":
      return <Glossary />;
    default:
      return <NotFound />;
  }
}

/** Every route is a literal path (known at build time) — no param matching. */
export function App() {
  return (
    <Layout>
      <Routes>
        {(routes as RouteDef[]).map((r) => (
          <Route key={r.path} path={r.path} element={elementFor(r)} />
        ))}
        {/* GitHub Pages serves the homepage file at /index.html too; send it to the canonical /. */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
