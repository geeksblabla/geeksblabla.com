import { file, glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { episodeSchema, teamSchema } from "./shema";
/**
 * Podcast collection
 * Read episodes markdown files from episodes folder in the root of the project
 * Validate the data using zod
 * Return the data based on the episodeSchema
 */
const podcast = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "episodes" }),
  schema: episodeSchema,
});

/**
 * Gallery collection
 * As you need env vars to use cldAssetsLoader, we need to use a mock data to allow people to play with the website locally
 */

const gallery = !import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  ? defineCollection({
      loader: file("gallery-mock-data.json"),
    })
  : defineCollection({
      loader: cldAssetsLoader({
        limit: 10,
        folder: "community-gallery",
      }),
    });

const team = defineCollection({
  loader: file("src/components/about/team-members.json"),
  schema: teamSchema,
});

export const collections = { podcast, gallery, team };
