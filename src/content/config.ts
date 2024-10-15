import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

const podcast = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "episodes" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    duration: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    youtube: z.string().url().optional(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
    // heroImage: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: cldAssetsLoader({
    limit: 10,
    folder: "community-gallery",
  }),
});

export const collections = { podcast, gallery };
