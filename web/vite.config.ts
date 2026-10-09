import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  // Project pages are served from /islamic-finance-and-tech/ — but the built
  // files are deployed to the repo root, so keep base relative for assets.
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
