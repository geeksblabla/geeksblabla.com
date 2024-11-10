import { z } from "zod";

/**
 * episode form schema
 */

export const episodeCategorySchema = z.enum([
  "dev",
  "career",
  "ama",
  "mss",
  "book",
  "ai",
]);

export const linkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const noteSchema = z.object({
  timestamp: z.string().regex(/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message:
      "Invalid timestamp format. Must be in HH:MM:SS format (e.g. 12:34:56)",
  }),
  content: z.string(),
});

const episodeSchemaBase = z.object({
  title: z.string(),
  date: z.coerce.date(),
  duration: z.string(),
  tags: z.array(z.string()),
  category: episodeCategorySchema,
  youtube: z.string().url(),
  published: z.boolean(),
  featured: z.boolean().optional().default(false),
});

export const episodeSchemaForm = episodeSchemaBase.extend({
  links: z.array(linkSchema),
  guests: z.array(linkSchema),
  hosts: z.array(linkSchema),
  description: z.string(),
  notes: z.array(noteSchema),
});
