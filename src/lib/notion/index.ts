import { Client } from "@notionhq/client";
import type {
  NotionResponse,
  NotionNormalizedResponse,
  NotionEpisodeCategory,
  NotionEpisodeStatus,
  NotionEpisodeProperties,
  NotionProperty,
  NotionPage,
  NotionPeopleProperties,
} from "./types";

const databaseId = import.meta.env.GEEKSBLABLA_NOTION_DATABASE_ID;
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

export const getEpisodeDetails = async (id: string) => {
  const episode = (await getNotionClient().pages.retrieve({
    page_id: id,
  })) as NotionPage;

  const normalizedEpisode = normalizeEpisodeProperties(episode.properties, id);
  const guests = await getPeopleDetails(normalizedEpisode.guests);
  const hosts = await getPeopleDetails(normalizedEpisode.hosts);
  console.log(JSON.stringify({ normalizedEpisode, guests, hosts }, null, 2));
  return {
    ...normalizedEpisode,
    guests,
    hosts,
  };
};

export const getPeopleDetails = async (ids: string[]) => {
  const users = (await Promise.all(
    ids.map(id => getNotionClient().pages.retrieve({ page_id: id }))
  )) as NotionPage[];
  console.log(JSON.stringify(users, null, 2));
  return users.map(user => normalizePeopleProperties(user.properties));
};

function normalizePeopleProperties(properties: {
  [key: string]: NotionProperty;
}): NotionPeopleProperties {
  return {
    title:
      properties.Name?.type === "title"
        ? (properties.Name.title[0]?.plain_text ?? "")
        : "",
    url: properties.link?.type === "url" ? (properties.link.url ?? "") : "",
  };
}

export function normalizeEpisodeProperties(
  properties: {
    [key: string]: NotionProperty;
  },
  id: string
): NotionEpisodeProperties {
  return {
    episodeId: id,
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
        ? properties.Guests.relation.map(relation => relation.id)
        : [],

    description:
      properties["Description "]?.type === "rich_text"
        ? (properties["Description "].rich_text[0]?.plain_text ?? "")
        : "",

    youtube:
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
        ? properties.Hosts.relation.map(relation => relation.id)
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
    console.log(page.id);
    return normalizeEpisodeProperties(properties, page.id);
  });
}

export async function addSuggestionToNotion({
  episodeId,
  name,
  content,
}: {
  episodeId: string;
  name: string;
  content: string;
}) {
  const notion = getNotionClient();

  const suggestion = {
    name,
    content,
    timestamp: new Date().toISOString(),
  };

  try {
    await notion.pages.update({
      page_id: episodeId,
      properties: {
        suggestions: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(suggestion),
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error("Error adding suggestion to Notion:", error);
    throw error;
  }
}
