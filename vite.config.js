import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change "talent-tree" below to your actual GitHub repo name.
// GitHub Pages serves project sites at https://<username>.github.io/<repo-name>/,
// so Vite needs to know that path prefix when it builds asset links.
export default defineConfig({
  plugins: [react()],
  base: "/Nebula-Tree/",
});
