import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import "./index.css";

/** Server entry used by scripts/prerender.mjs — renders one route to HTML. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url} basename="/">
      <App />
    </StaticRouter>
  );
}
