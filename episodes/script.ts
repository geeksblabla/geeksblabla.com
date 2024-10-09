import * as fs from 'fs';
import * as path from 'path';

const episodesDir = 'episodes';

interface Episode {
  filename: string;
  date: Date;
}

function extractDate(filePath: string): Date | null {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/date:\s*(\d{4}-\d{2}-\d{2})/);
  if (match) {
    return new Date(match[1]);
  }
  return null;
}

function renameEpisodes() {
  const files = fs.readdirSync(episodesDir);
  const episodes: Episode[] = [];

  for (const filename of files) {
    if (filename.endsWith('.md')) {
      const filePath = path.join(episodesDir, filename);
      const date = extractDate(filePath);
      if (date) {
        episodes.push({ filename, date });
      }
    }
  }

  episodes.sort((a, b) => a.date.getTime() - b.date.getTime());

  for (let i = 0; i < episodes.length; i++) {
    const oldFilename = episodes[i].filename;
    const newFilename = `episode-${(i + 1).toString().padStart(4, '0')}.md`;
    const oldPath = path.join(episodesDir, oldFilename);
    const newPath = path.join(episodesDir, newFilename);

    let content = fs.readFileSync(oldPath, 'utf-8');

    // Update the episode number in the title if it exists
    content = content.replace(
      /(title:\s*".*?)\s*#\d+/,
      `$1 #${i + 1}`
    );

    fs.writeFileSync(newPath, content);
    fs.unlinkSync(oldPath);

    console.log(`Renamed ${oldFilename} to ${newFilename}`);
  }

  console.log("Renaming complete!");
}

renameEpisodes();
