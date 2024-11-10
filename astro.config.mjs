import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import icon from "astro-icon";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "static",

  build: {
    format: "file",
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    icon(),
    mdx(),
    pagefind(),
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },

  scopedStyleStrategy: "where",
  vite: {
    ssr: {
      // TODO: should be fixed in the future
      external: ["path", "fs", "stream", "util"],
    },
  },

  adapter: cloudflare(),
});
