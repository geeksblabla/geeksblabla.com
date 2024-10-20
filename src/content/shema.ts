import { z } from "astro:content";
import { slug as slugger } from "github-slugger";

const slugify = (str: string) => slugger(str);

const getYoutubeThumbnail = (youtubeUrl?: string) => {
  if (!youtubeUrl) return ""; // TODO: add default image in case of no thumbnail
  const videoId = youtubeUrl.split("v=")[1];
  if (!videoId) return ""; // TODO: add default image in case of no thumbnail
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const transformDate = (date: string) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

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
    heroImage: z.string().optional(),
    slug: z.string().optional(),
    episodeSlug: z.string().optional(),
  })
  .transform(arg => {
    const heroImage = getYoutubeThumbnail(arg.youtube);
    const episodeSlug = arg.slug ? arg.slug : slugify(arg.title);
    const dateString = transformDate(arg.date.toISOString());
    return {
      ...arg,
      heroImage,
      episodeSlug,
      dateString,
    };
  });

export const teamSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name cannot be empty"),
  x_handle: z.string().regex(/^@\w+$/, "Invalid Twitter handle format"),
  profile_image: z
    .string()
    .regex(/\.(jpg|jpeg|png|gif)$/, "Invalid image file format"),
  status: z.enum(["active", "past"]),
});
