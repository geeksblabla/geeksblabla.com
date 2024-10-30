// TODO: use https://www.typescriptlang.org/play/?ssl=44&ssc=37&pln=44&pc=40#code/PTAEBUAsEsGdTqAhqADgGyQTwOYCcB7AVwDsATUAd0gFM8bQtjQBjJE0GgDwwPtAAutUABF2OOqABSAZQBQIUAEEACgElk5ULEhJ+LAmQawkAWww1YAOlAB5EiwZCG9CumglLoAEY10BSlAAIjJxOiCFMHYKINQkISDkfhwCT0FaDiYiVnZtAT0BQQJOHn9+SjxoAQ8cSNA8InQvADM+UTC8Zugm6zk5aHM+QoBvUFCSCTwAGlBmpG6Z0z0AazIAkhnKPQ3QU0sTCVAAX1nCU2DxyYiB1CHQACpkeDihU4Jz2PjICLrVDXpmnQaA4aAAuUCQAQCVCwUEgS50KywLCwAQ0UywYAAK0xAKBIKskNM6D6BhIqLQeFAAF4xh0rDgqpAiN4rKg8H1FAAxDwUYiFaDNbTvBhxPDVFiNPSzbpeXQANwYLF0ExoFA86UQKgASqA5GSKWtJXsSPlqqkaXTVXgGVUrF0mgBZeLKgAUQXu92A9yspjIQQAlPrUhTlWF-DhLQibYyBPbZc6BG6ggBhAASSgAcgBxACiABlbNnff6gwbCnEWMskBIpLALbTo7a4w6aInk5XqxIrDjUoHg+TCv4q62o-TY-GnS7IO6sNsrMPlkEZp8qzWaABaRc9+skft1bWNSycsBQdjLWYEdDLeCtKlLZY1MYEFisFUSWD9IWuo1EE1m6BUisNUqjVANQGGORQGg3Z9nXd0zxIG9QA3UAAHUGFBWgCnBYgqQAbV-f89GgdhYAAXVdSFoThYBKHoqwKlA5wjWsPgcGAAMAEJ+yOE9QG1dFeTQGgCAsIpQCIVBQjRUBF1bT9BVAV1O3XOsgNMQxBWgNVQAAMj00AuPk2VfS0rowIgqCYK2PASAQmB4B1XZzJ0ihVO7Xsdm8IhChIAhCmcOSX2WVteP4tCMnSIEkgYJBUFQDcw1VeBogQQoiHgfzChQZyljwZZdKQeABEqeVSPQGZuFQGgWAEOpnH4ARil8UB0yzPNC2zN8wl6ctBDKirnNpdkrG8QwsCsDwWHQIgjFgd1SugcqkHQfslNdLjkokCNgLIUCKAMoylpW9AdXAyDoLmbp3UzYp2pzAsi2QMgjDIKxwrqO7QGcxBmuKWAlnQdAJNsvB2BytA9BrcHUEgUA2gEShigIIVYD-fKsC-ZTRvGshJqaCZXmpEnQAABgu6zrvQd0VCaYq4te5AxksFhKlQc0OGaxg8J+7UPqDPjFCUdAthRThySIco4tgWBoBwDh6z2VInGKXLtRmJSqlS7GVJtYq5YVmgGBJ2kSEadBKeg-q9iEQxLVG6oBCaKaHFm+b3TQtQVEDUAAH4qG2UBwWp6zbcgQxafp2AZcNxWRRViS9jwQ4hC1DXND5DnAJIVb0CwBA3bm0VRPE6gAYjxoKHocqaEoAW5D4upc0lprdEhzBfBB3R4F8YFtBoeqNqbWNmVZOB0ZoBckC76xCZwYnSYpqzoNs+ygigdPny8bKISQRVNALzu-GscKgA to validate on new pr

import type { CollectionEntry } from "astro:content";

interface Link {
  title: string;
  url: string;
}

interface EpisodeContent {
  description: string;
  guests: Link[];
  notes: string;
  links: Link[];
  hosts: Link[];
}

/**
 * Format the notes to add links to the timestamps
 * we search for the pattern `00:00:00` and replace it with a link to the timestamp in the episode [00:00:30](#30)
 * This is used to make notes clickable and navigate to the timestamp in the episode, similar to youtube timestamps
 * @param notes - The notes string to format
 * @returns The formatted notes string
 */
function formatNotes(notes: string): string {
  const timestampRegex = /(\d+):(\d{2}):(\d{2})/g;

  return notes.replace(timestampRegex, (match, hours, minutes, seconds) => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    return `[${match}](#${totalSeconds})`;
  });
}

/**
 * Extract links from the given markdown string
 * We search for the pattern `[title](url)` and return an array of links
 * @param markdown - The markdown string to extract links from
 * @returns An array of links found in the markdown string
 */
function extractLinks(markdown: string): Link[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: Link[] = [];
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    links.push({
      title: match[1],
      url: match[2],
    });
  }

  return links;
}

/**
 * As we have different format while showing the episode content in the new website we need to extract the content of each episode by sections
 * This function will extract the content and return object with sections as keys: description, guests, notes, links, hosts
 * all the logic is based on the fact that every section starts with a `##` header, this is a very fragile logic but it works for now and we only need to make sure we are respecting this format while adding new episodes
 * @param content - The content string to extract the episode content from, maily episode file row content
 * @returns object with sections as keys: description, guests, notes, links, hosts
 */
export function extractEpisodeContent(content: string): EpisodeContent {
  const sections = content.split(/(?=^## )/m);
  // this is too risky, but no way we can think of a better way to do this
  // tried using comments inside markdown, but the content loader ignores them :)
  const [description, guestsSection, notesSection, linksSection, hostsSection] =
    sections;

  return {
    description: description.trim(),
    guests: extractLinks(guestsSection || ""),
    notes: formatNotes(
      notesSection?.split("\n").slice(1).join("\n").trim() || ""
    ),
    links: extractLinks(linksSection || ""),
    hosts: extractLinks(hostsSection || ""),
  };
}

export function getPodcastCategories(podcast: CollectionEntry<"podcast">[]) {
  const categories = podcast.reduce(
    (acc, episode) => {
      const category = episode.data.category;
      const existingCategory = acc.find(c => c.name === category);

      if (existingCategory) {
        existingCategory.count++;
      } else {
        acc.push({ name: category, count: 1 });
      }

      return acc;
    },
    [] as { name: string; count: number }[]
  );

  return categories;
}

export function getLastEpisode(podcast: CollectionEntry<"podcast">[]) {
  return podcast.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )[0];
}
