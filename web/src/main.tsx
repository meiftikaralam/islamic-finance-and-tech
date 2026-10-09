import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import { useSeo } from "./lib/seo";

function ClientApp() {
  useSeo();
  return <App />;
}

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <BrowserRouter>
      <ClientApp />
    </BrowserRouter>
  </StrictMode>
);
