import * as fs from "fs";
import * as path from "path";

const episodesDir = "./episodes";

function processFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let inFrontmatter = false;
  let frontmatterStart = -1;
  let frontmatterEnd = -1;

  // Find frontmatter boundaries
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      if (!inFrontmatter) {
        inFrontmatter = true;
        frontmatterStart = i;
      } else {
        frontmatterEnd = i;
        break;
      }
    }
  }

  if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
    const frontmatter = lines.slice(frontmatterStart + 1, frontmatterEnd);
    const updatedFrontmatter = frontmatter.filter(line => {
      const key = line.split(":")[0].trim();
      return !["isNext", "time", "video", "podcastUrl", "url"].includes(key);
    });

    const updatedContent = [
      ...lines.slice(0, frontmatterStart + 1),
      ...updatedFrontmatter,
      ...lines.slice(frontmatterEnd),
    ].join("\n");

    fs.writeFileSync(filePath, updatedContent);
  }
}

function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === ".md") {
      processFile(filePath);
    }
  }
}

processDirectory(episodesDir);
console.log("Processing complete.");
