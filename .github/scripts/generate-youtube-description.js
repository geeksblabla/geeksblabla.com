// @ts-check
import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

/**
 * Renders a title with a hash symbol
 * @param {string} title - The title to render
 * @returns {string} The rendered title for youtube description
 */
const renderTitle = title => {
  return `\n\n ${title}\n ---------------------`;
};

/**
 * Generates a YouTube description from an episode markdown file
 * @param {string} input - Either episode number or full file path
 * @returns {{youtube: string, description: string}} The formatted YouTube description
 */
export function generateYoutubeDescription(input) {
  try {
    // Determine if input is episode number or path
    const filePath = input.includes(".md")
      ? input
      : join(
          process.cwd(),
          "episodes",
          `episode-${String(input).padStart(4, "0")}.md`
        );

    // Read and parse the markdown file
    const fileContent = readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    // Build description
    let description = ``;

    // Replace section headers with icons, add extra space, and convert markdown links
    let formattedContent = content
      .replace(/## Notes/g, renderTitle("⏱️ Timeline"))
      .replace(/## Links/g, renderTitle("🔗 Links"))
      .replace(/## Guests/g, renderTitle("👥 Guests"))
      .replace(/## Prepared and Presented by/g, renderTitle("🎤 Hosts"))
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1: $2");

    description += formattedContent;

    // Add standard footer with social links
    description += renderTitle("🔗 Follow us");
    description += `\nSpotify: https://open.spotify.com/show/0UlTBXh7iH6x0HO6FgYzAD\n`;
    description += `LinkedIn: https://www.linkedin.com/company/geeksblabla-community\n`;
    description += `Facebook: https://www.facebook.com/geeksblabla\n`;
    description += `Twitter: https://twitter.com/geeksblabla\n`;
    description += `Instagram: https://www.instagram.com/geeksblabla\n`;
    description += `GitHub: https://github.com/geeksblabla\n\n`;
    description += `Visit our website: https://geeksblabla.io\n`;

    // Add a detailed description of the podcast in Moroccan Darija
    description += `\n\n🎙️ جيكس بلابلا هو بودكاست ديال الكوميونيتي فين كنديرو نقاشات شيقة و ممتعة على مواضيع مختلفة في عالم التكنولوجيا مع ناس مميزين من الكوميونيتي ديالنا.\n`;
    description += `كنلتقاو كل نهار الأحد على 8 ديال الليل، وجهد راسك باش تتعلم و تستافد معانا فهاد النقاشات حول أحدث المواضيع التقنية بالدارجة المغربية. 🚀\n\n`;
    description += `#GeeksBlabla #darija  #تكنولوجيا #المغرب #برمجة #مبرمجين_مغاربة #تقنية #بودكاست_مغربي #تعلم_البرمجة #مطورين #تكنولوجيا_المعلومات #مجتمع_البرمجة #تطوير_الويب #دروس_برمجة #تقنية_المعلومات`;

    // Return object with frontmatter and description
    return {
      youtube: frontmatter.youtube,
      description,
    };
  } catch (error) {
    console.error("Error generating description:", error);
    process.exit(1);
  }
}

// Main execution
const main = () => {
  const input = process.argv[2];

  if (!input) {
    console.error("Please provide an episode number or file path");
    process.exit(1);
  }

  const result = generateYoutubeDescription(input);
  console.log(JSON.stringify(result, null, 2));
};

main();
