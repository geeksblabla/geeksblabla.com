import { getEpisodeDetails as getNotionEpisodeDetails } from "@/lib/notion";
import { getYoutubeVideoDetails } from "@/lib/youtube";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

export const getEpisodeDetails = defineAction({
  accept: "json",
  input: z.object({
    url: z.string(),
  }),
  handler: async ({ url }) => {
    const episodeId = url.split("-").pop();
    if (!episodeId) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Invalid URL",
      });
    }
    try {
      const episodeDetails = await getNotionEpisodeDetails(episodeId);
      const youtubeDetails = await getYoutubeVideoDetails(
        episodeDetails.youtube
      );
      return {
        ...episodeDetails,
        ...youtubeDetails,
      };
    } catch (error) {
      console.error("Error getting episode details:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting episode details",
      });
    }
  },
});
