import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { addNewEpisodeToNotion } from "@/lib/notion";

export const submitNewEpisode = defineAction({
  accept: "form",
  input: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    submittedBy: z.string().min(2),
  }),
  handler: async ({ title, description, submittedBy }) => {
    try {
      await addNewEpisodeToNotion({
        title,
        description,
        submittedBy,
      });

      return {
        success: true,
        message:
          "Thank you! Your episode suggestion has been submitted successfully!",
      };
    } catch (error) {
      console.error("Error submitting new episode:", error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to submit new episode suggestion",
      });
    }
  },
});
