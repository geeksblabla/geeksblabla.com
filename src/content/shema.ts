import { z } from "astro:content";
import { slug as slugger } from "github-slugger";

const slugify = (str: string) => slugger(str);

const getYoutubeThumbnail = (youtubeUrl?: string) => {
  if (!youtubeUrl) return ""; // TODO: add default image in case of no thumbnail
  const videoId = youtubeUrl.split("v=")[1];
  if (!videoId) return ""; // TODO: add default image in case of no thumbnail
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const episodeSchema = z
  .object({
    title: z.string(),
    date: z.coerce.date(),
    duration: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    youtube: z.string().url().optional(),
    published: z.boolean(),
    featured: z.boolean().optional().default(false),
    heroImage: z.string().optional(),
    slug: z.string().optional(),
    episodeSlug: z.string().optional(),
  })
  .transform(arg => {
    const heroImage = getYoutubeThumbnail(arg.youtube);
    const episodeSlug = arg.slug ? arg.slug : slugify(arg.title);
    return {
      ...arg,
      heroImage,
      episodeSlug,
    };
  });
