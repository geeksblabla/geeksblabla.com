import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { addSuggestionToNotion } from "@/lib/notion";

export const submitSuggestion = defineAction({
  accept: "form",
  input: z.object({
    episodeId: z.string(),
    name: z.string().min(2),
    content: z.string().min(3),
  }),
  handler: async ({ episodeId, name, content }) => {
    try {
      await addSuggestionToNotion({
        episodeId,
        name,
        content,
      });

      return {
        success: true,
        message: "Thank you! Your suggestion has been submitted successfully!",
      };
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to submit suggestion",
      });
    }
  },
});
