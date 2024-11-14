import type { z } from "zod";
import type { episodeSchemaForm } from "./schema";

type FormValues = z.infer<typeof episodeSchemaForm>;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function generateEpisodeMarkdown(episode: FormValues): string {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const frontmatter = `---
date: ${formatDate(episode.date)}
duration: "${episode.duration}"
title: "${episode.title}"
tags: [${episode.tags.map(tag => `"${tag}"`).join(", ")}]
category: "${episode.category}"
youtube: ${episode.youtube}
published: ${episode.published}
featured: ${episode.featured}
---

${capitalize(episode.description)}

## Guests

${episode.guests.map(guest => `- [${guest.title}](${guest.url})`).join("\n")}

## Notes

${episode.notes.map(note => `${note.timestamp} - ${capitalize(note.content)}`).join("\n\n")}

## Links

${episode.links.map(link => `- [${link.title}](${link.url})`).join("\n")}

## Prepared and Presented by

${episode.hosts.map(host => `- [${capitalize(host.title)}](${host.url})`).join("\n")}
`;

  return frontmatter;
}
