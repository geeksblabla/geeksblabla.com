import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { episodeSchema } from "./shema";

const podcast = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "episodes" }),
  schema: episodeSchema,
});

const gallery = defineCollection({
  loader: cldAssetsLoader({
    limit: 10,
    folder: "community-gallery",
  }),
});

export const collections = { podcast, gallery };
