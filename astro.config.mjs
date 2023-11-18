import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetchContent from "./integration/prefetch-content";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://www.jacobbolda.com",
  integrations: [prefetchContent(), react(), mdx(), sitemap(), tailwind()],
  experimental: { devOverlay: true },
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: "material-theme-palenight",
      // Alternatively, provide multiple themes
      // https://github.com/antfu/shikiji#lightdark-dual-themes
      // experimentalThemes: {
      //   light: "github-light",
      //   dark: "github-dark",
      // },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
