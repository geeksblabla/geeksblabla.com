// @ts-check
import { generateYoutubeDescription } from "./generate-youtube-description.js";
import fetch from "node-fetch";

const WEBHOOK_URL = process.env.YOUTUBE_WEBHOOK_URL;

/**
 * Sends the YouTube description to a webhook
 * @param {string} input - Either episode number or full file path
 */
async function updateYoutubeDescription(input) {
  try {
    // Get webhook URL from environment variable
    const webhookUrl = process.env.WEBHOOK_URL ?? WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("WEBHOOK_URL environment variable is not set");
    }

    // Generate the description
    const { youtube, description } = generateYoutubeDescription(input);
    const youtubeId = youtube.split("v=")[1];
    // Send to webhook
    const formData = new URLSearchParams();
    formData.append("youtube_id", youtubeId);
    formData.append("content", description);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      let errorMessage = `Webhook request failed with status ${response.status}`;
      try {
        const body = await response.text();
        errorMessage += `: ${body}`;
      } catch (e) {
        console.error(e);
      }
      throw new Error(errorMessage);
    }

    console.log(
      `Successfully sent description for episode ${input} to webhook`
    );
  } catch (error) {
    console.error("Error updating YouTube description:", error);
    process.exit(1);
  }
}

// Get episode number from command line argument
const input = process.argv[2];
if (!input) {
  console.error("Please provide an episode number");
  process.exit(1);
}

updateYoutubeDescription(input);
