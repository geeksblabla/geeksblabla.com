import {
  getYoutubeThumbnail,
  slugify,
  transformDateToLocaleString,
} from "@/lib/utils";
import { z } from "astro:content";

export const episodeSchema = z
  .object({
    title: z.string(),
    date: z.coerce.date(),
    dateString: z.string().optional(),
    duration: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    youtube: z.string().url(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
    ogImage: z.string().optional(),
    slug: z.string().optional(),
    episodeSlug: z.string().optional(),
  })
  .transform(arg => {
    const ogImage = getYoutubeThumbnail(arg.youtube);
    const episodeSlug = arg.slug ? arg.slug : slugify(arg.title);
    const dateString = transformDateToLocaleString(arg.date.toISOString());
    return {
      ...arg,
      ogImage,
      episodeSlug,
      dateString,
    };
  });

export const blogSchema = z
  .object({
    author: z.string().optional().default("Geeksblabla Team"),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    keywords: z.array(z.string()).default([""]),
    ogImage: z.string().optional(),
    description: z.string().optional().default(""),
    published: z.boolean().optional().default(true),
  })
  .transform(arg => {
    const postSlug = arg.postSlug ? arg.postSlug : slugify(arg.title);
    const ogImage = arg.ogImage ? arg.ogImage : `${arg.title}.png`;
    return {
      ...arg,
      postSlug,
      ogImage,
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
