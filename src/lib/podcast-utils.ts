// TODO: use https://www.typescriptlang.org/play/?ssl=44&ssc=37&pln=44&pc=40#code/PTAEBUAsEsGdTqAhqADgGyQTwOYCcB7AVwDsATUAd0gFM8bQtjQBjJE0GgDwwPtAAutUABF2OOqABSAZQBQIUAEEACgElk5ULEhJ+LAmQawkAWww1YAOlAB5EiwZCG9CumglLoAEY10BSlAAIjJxOiCFMHYKINQkISDkfhwCT0FaDiYiVnZtAT0BQQJOHn9+SjxoAQ8cSNA8InQvADM+UTC8Zugm6zk5aHM+QoBvUFCSCTwAGlBmpG6Z0z0AazIAkhnKPQ3QU0sTCVAAX1nCU2DxyYiB1CHQACpkeDihU4Jz2PjICLrVDXpmnQaA4aAAuUCQAQCVCwUEgS50KywLCwAQ0UywYAAK0xAKBIKskNM6D6BhIqLQeFAAF4xh0rDgqpAiN4rKg8H1FAAxDwUYiFaDNbTvBhxPDVFiNPSzbpeXQANwYLF0ExoFA86UQKgASqA5GSKWtJXsSPlqqkaXTVXgGVUrF0mgBZeLKgAUQXu92A9yspjIQQAlPrUhTlWF-DhLQibYyBPbZc6BG6ggBhAASSgAcgBxACiABlbNnff6gwbCnEWMskBIpLALbTo7a4w6aInk5XqxIrDjUoHg+TCv4q62o-TY-GnS7IO6sNsrMPlkEZp8qzWaABaRc9+skft1bWNSycsBQdjLWYEdDLeCtKlLZY1MYEFisFUSWD9IWuo1EE1m6BUisNUqjVANQGGORQGg3Z9nXd0zxIG9QA3UAAHUGFBWgCnBYgqQAbV-f89GgdhYAAXVdSFoThYBKHoqwKlA5wjWsPgcGAAMAEJ+yOE9QG1dFeTQGgCAsIpQCIVBQjRUBF1bT9BVAV1O3XOsgNMQxBWgNVQAAMj00AuPk2VfS0rowIgqCYK2PASAQmB4B1XZzJ0ihVO7Xsdm8IhChIAhCmcOSX2WVteP4tCMnSIEkgYJBUFQDcw1VeBogQQoiHgfzChQZyljwZZdKQeABEqeVSPQGZuFQGgWAEOpnH4ARil8UB0yzPNC2zN8wl6ctBDKirnNpdkrG8QwsCsDwWHQIgjFgd1SugcqkHQfslNdLjkokCNgLIUCKAMoylpW9AdXAyDoLmbp3UzYp2pzAsi2QMgjDIKxwrqO7QGcxBmuKWAlnQdAJNsvB2BytA9BrcHUEgUA2gEShigIIVYD-fKsC-ZTRvGshJqaCZXmpEnQAABgu6zrvQd0VCaYq4te5AxksFhKlQc0OGaxg8J+7UPqDPjFCUdAthRThySIco4tgWBoBwDh6z2VInGKXLtRmJSqlS7GVJtYq5YVmgGBJ2kSEadBKeg-q9iEQxLVG6oBCaKaHFm+b3TQtQVEDUAAH4qG2UBwWp6zbcgQxafp2AZcNxWRRViS9jwQ4hC1DXND5DnAJIVb0CwBA3bm0VRPE6gAYjxoKHocqaEoAW5D4upc0lprdEhzBfBB3R4F8YFtBoeqNqbWNmVZOB0ZoBckC76xCZwYnSYpqzoNs+ygigdPny8bKISQRVNALzu-GscKgA to validate on new pr

// const episodeRowContent = `
// In this episode, we discuss the state of development in Morocco. We talk about the results of the survey, job satisfaction, salaries, AI adoption, and community contribution. We explore how they learn and level up, the tools they are using, and what they want to learn next.

// ## Guests

// - [Meriem zaid](https://twitter.com/iMeriem_)

// - [Omaima Khalil](https://twitter.com/BadQuinn3)

// - [Mohammed Aboullaite](https://aboullaite.me)

// - [Nouamane Tazi](https://www.linkedin.com/in/nouamanetazi/)

// - [Adnan MERRAKCHI](https://twitter.com/_admerra)

// ## Notes

// 0:00:00 - Introduction and welcoming

// 0:04:56 - State overview

// 0:11:30 - Profile: Female participation, age, and experience

// 0:55:03 - Learning and education in Morocco

// 1:17:30 - Work and job satisfaction

// 1:37:30 - Technology and tools, frameworks, cloud, CSS, and more.

// 1:52:45 - AI adoption for Moroccan developers: tools, learning, companies using AI.

// 2:19:45 - How Moroccan developers feel about the impact of AI on their jobs.

// 2:43:00 - Social media usage among Moroccan developers

// 2:47:43 - Warming up and goodbye

// ## Links

// - [stateofdev.ma](https://stateofdev.ma/)

// ## Prepared and Presented by

// - [Youssouf El Azizi](https://elazizi.com/)

// `;

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

function formatNotes(notes: string): string {
  const timestampRegex = /(\d+):(\d{2}):(\d{2})/g;

  return notes.replace(timestampRegex, (match, hours, minutes, seconds) => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    return `[${match}](#${totalSeconds})`;
  });
}

export function extractEpisodeContent(content: string): EpisodeContent {
  const sections = content.split(/(?=^## )/m);
  // this is too risky, but no way we can think of a better way to do this
  // tried using comments inside markdown, but the content loader ignores them :)
  const [description, guestsSection, notesSection, linksSection, hostsSection] =
    sections;

  console.log(
    description,
    guestsSection,
    notesSection,
    linksSection,
    hostsSection
  );

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

// console.log(extractEpisodeContent(episodeRowContent));
