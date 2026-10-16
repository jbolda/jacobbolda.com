import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import Icons from "unplugin-icons/vite";

import playformCompress from "@playform/compress";
import { syncDraftArticles } from "./scripts/sync-draft-articles.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO add the rss plugin

// https://astro.build/config
export default defineConfig({
  site: "https://www.jacobbolda.com",
  integrations: [
    {
      name: "sync-draft-articles",
      hooks: {
        "astro:config:setup": async ({ command }) => {
          const mode = command === "build" ? "production" : "development";
          const env = loadEnv(mode, process.cwd(), "");
          const contentApiBase =
            env.CONTENT_API_URL || "https://content-api.jbolda.workers.dev";
          await syncDraftArticles(`${contentApiBase}/drafts`);
        },
      },
    },
    react(),
    mdx(),
    sitemap(),
    playformCompress({ Image: false }),
  ],
  experimental: {
    incrementalBuild: true,
  },
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
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "react",
      }),
    ],
  },
});
