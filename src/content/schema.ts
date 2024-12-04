import {
  getYoutubeThumbnail,
  slugify,
  transformDateToLocaleString,
} from "@/lib/utils";
import { z } from "astro:content";

export const podcastCategorySchema = z.enum([
  "dev",
  "career",
  "ama",
  "mss",
  "book",
  "ai",
]);

export type PodcastCategory = z.infer<typeof podcastCategorySchema>;

export const episodeSchema = z
  .object({
    title: z.string(),
    date: z.coerce.date(),
    dateString: z.string().optional(),
    duration: z.string(),
    tags: z.array(z.string()),
    category: podcastCategorySchema,
    youtube: z.string().url(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
    ogImage: z.string().optional(),
    slug: z.string().optional(),
  })
  .transform(arg => {
    const ogImage = getYoutubeThumbnail(arg.youtube);
    const slug = arg.slug ? arg.slug : slugify(arg.title);
    const dateString = transformDateToLocaleString(arg.date.toISOString());
    const category = arg.category.toLowerCase();
    return {
      ...arg,
      ogImage,
      slug,
      dateString,
      category,
    };
  });

export const blogSchema = z
  .object({
    author: z.string().optional().default("Geeksblabla Team"),
    pubDatetime: z.date(),
    title: z.string(),
    slug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    keywords: z.array(z.string()).default([""]),
    ogImage: z.string().optional(),
    description: z.string().optional().default(""),
    published: z.boolean().optional().default(true),
  })
  .transform(arg => {
    const slug = arg.slug ? arg.slug : slugify(arg.title);
    return {
      ...arg,
      slug,
    };
  });

export type ArticleFrontmatter = z.infer<typeof blogSchema>;

export const teamSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name cannot be empty"),
  x_handle: z.string().regex(/^@\w+$/, "Invalid Twitter handle format"),
  profile_image: z
    .string()
    .regex(/\.(jpg|jpeg|png|gif)$/, "Invalid image file format"),
  status: z.enum(["active", "past"]),
});
