import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

export const getPageTitles = defineAction({
  accept: "json",
  input: z.object({
    urls: z.union([z.string(), z.array(z.string())]),
  }),
  handler: async ({ urls }) => {
    try {
      const urlList = Array.isArray(urls) ? urls : [urls];

      const results = await Promise.all(
        urlList.map(async url => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              console.warn(`Failed to fetch ${url}`);
              return { url, title: "Not found" };
            }
            const text = await response.text();
            const titleMatch = text.match(/<title>(.*?)<\/title>/i);
            const title = titleMatch ? titleMatch[1] : "No title found";
            return { url, title };
          } catch (error) {
            console.warn(`Error fetching ${url}:`, error);
            return { url, title: "Not found" };
          }
        })
      );

      // Filter out any null results (failed fetches)
      return results.filter(result => result !== null);
    } catch (error) {
      console.error("Unexpected error:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred while fetching page titles.",
      });
    }
  },
});
