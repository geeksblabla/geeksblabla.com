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
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "hybrid",
  adapter: netlify(),
  prefetch: {
    prefetchAll: true,
  },
  experimental: { contentLayer: true, serverIslands: true },
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
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    assetsInclude: ["**/*.riv"],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
