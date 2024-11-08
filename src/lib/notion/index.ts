import { Client } from "@notionhq/client";
import type {
  NotionResponse,
  NotionNormalizedResponse,
  NotionEpisodeCategory,
  NotionEpisodeStatus,
  NotionEpisodeProperties,
  NotionEpisodeProperty,
} from "./types";

const databaseId = import.meta.env.GEEKSBLALA_NOTION_DATABASE_ID;
const apiKey = import.meta.env.NOTION_API_KEY;

let notionClient: Client;

const getNotionClient = () => {
  if (!notionClient) {
    notionClient = new Client({ auth: apiKey });
  }
  return notionClient;
};

export async function getGeekBlablaEpisodesPlannings(): Promise<NotionNormalizedResponse> {
  if (import.meta.env.DEV) {
    if (!apiKey || !databaseId) {
      const data = await import("./notion-mock.json");
      return data.default as unknown as NotionNormalizedResponse;
    }
  }

  const episodes = (await getNotionClient().databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "Status",
          select: {
            equals: "Backlog",
          },
        },
        {
          property: "Status",
          select: {
            equals: "Scheduled",
          },
        },
        {
          property: "Status",
          select: {
            equals: "Next Up",
          },
        },
      ],
    },
  })) as NotionResponse;
  return normalizeNotionResponse(episodes);
}

export function normalizeEpisodeProperties(properties: {
  [key: string]: NotionEpisodeProperty;
}): NotionEpisodeProperties {
  return {
    title:
      properties.title?.type === "title"
        ? (properties.title.title[0]?.plain_text ?? "")
        : "",

    date:
      properties.Date?.type === "date"
        ? (properties.Date.date?.start ?? "")
        : "",

    guests:
      properties.Guests?.type === "relation"
        ? [] // Since guests are coming as empty relations in the sample
        : [],

    description:
      properties["Description "]?.type === "rich_text"
        ? (properties["Description "].rich_text[0]?.plain_text ?? "")
        : "",

    youtubeUrl:
      properties["Youtube URL"]?.type === "url"
        ? (properties["Youtube URL"].url ?? "")
        : "",

    category:
      properties["Category "]?.type === "select"
        ? ((properties[
            "Category "
          ].select?.name.toLowerCase() as NotionEpisodeCategory) ?? "dev")
        : "dev",

    hosts:
      properties.Hosts?.type === "relation"
        ? [] // Since hosts are coming as empty relations in the sample
        : [],

    assignedTo:
      properties["Assign to "]?.type === "people"
        ? (properties["Assign to "].people[0]?.name ?? "")
        : "",

    status:
      properties.Status?.type === "select"
        ? ((properties.Status.select?.name.toLowerCase() as NotionEpisodeStatus) ??
          "backlog")
        : "backlog",
  };
}

export function normalizeNotionResponse(
  response: NotionResponse
): NotionNormalizedResponse {
  return response.results.map(page => {
    const properties = page.properties;
    return normalizeEpisodeProperties(properties);
  });
}
