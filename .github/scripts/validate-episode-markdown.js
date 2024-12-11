// @ts-check
import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const markdownLinkRegex = /^(?:[-*]\s*)?\[.+\]\(.+\)$/;

/**
 * Validate the frontmatter of an episode
 * @param {Object} frontMatter - The frontmatter object
 * @param {Array<{line: number, message: string}>} errors - The array of errors
 */
const validateFrontMatter = (frontMatter, errors) => {
  // Enhanced frontmatter validation based on schema.ts
  const requiredFrontMatter = [
    "date",
    "duration",
    "title",
    "tags",
    "category",
    "youtube",
    "published",
  ];

  // Validate required fields
  requiredFrontMatter.forEach(field => {
    if (!frontMatter[field]) {
      errors.push({
        line: 1,
        message: `Missing required frontmatter field: ${field}`,
      });
    }
  });

  // Validate specific fields according to schema
  if (frontMatter.title && /["\u0600-\u06FF]/.test(frontMatter.title)) {
    errors.push({
      line: 1,
      message: "Title cannot contain quotation marks or Arabic characters",
    });
  }

  if (frontMatter.youtube && !frontMatter.youtube.startsWith("http")) {
    errors.push({
      line: 1,
      message: "YouTube field must be a valid URL",
    });
  }

  const validCategories = ["dev", "career", "ama", "mss", "book", "ai"];
  if (frontMatter.category && !validCategories.includes(frontMatter.category)) {
    errors.push({
      line: 1,
      message: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
    });
  }

  if (
    frontMatter.duration &&
    !/^(?:[0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(
      frontMatter.duration
    )
  ) {
    errors.push({
      line: 1,
      message: "Duration must be in HH:MM:SS format (e.g. 12:34:56)",
    });
  }

  if (frontMatter.tags && !Array.isArray(frontMatter.tags)) {
    errors.push({
      line: 1,
      message: "Tags must be an array",
    });
  }

  if (
    frontMatter.published !== undefined &&
    typeof frontMatter.published !== "boolean"
  ) {
    errors.push({
      line: 1,
      message: "Published must be a boolean value",
    });
  }

  if (
    frontMatter.featured !== undefined &&
    typeof frontMatter.featured !== "boolean"
  ) {
    errors.push({
      line: 1,
      message: "Featured must be a boolean value",
    });
  }
};

/**
 * Validate the markdown file for an episode
 * @param {string} episodeNumber - The episode number to validate
 * @returns {Object} - An object containing the validation results
 */

function validateEpisodeMarkdown(episodeNumber) {
  /**
   * @type {Array<{line: number, message: string}>}
   */
  const errors = [];
  try {
    // Read the episode file
    const paddedNumber = String(episodeNumber).padStart(4, "0");
    const filePath = join(
      process.cwd(),
      "episodes",
      `episode-${paddedNumber}.md`
    );
    const fileContent = readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");

    // Parse frontmatter and content
    const { data: frontMatter } = matter(fileContent);

    validateFrontMatter(frontMatter, errors);

    // Find line numbers for each section
    const sectionLines = {
      "## Guests": -1,
      "## Notes": -1,
      "## Links": -1,
      "## Prepared and Presented by": -1,
    };

    lines.forEach((line, index) => {
      // Make the check more flexible by trimming and comparing
      const trimmedLine = line.trim();
      Object.keys(sectionLines).forEach(section => {
        if (trimmedLine === section) {
          sectionLines[section] = index + 1;
        }
      });
    });

    // Validate main sections if they are present
    Object.entries(sectionLines).forEach(([section, lineNum]) => {
      if (lineNum === -1) {
        errors.push({
          line: -1,
          message: `Missing required section: ${section}`,
        });
      }
    });

    // Validate Guests format and if every line represents a valid guest format
    if (sectionLines["## Guests"] !== -1) {
      let currentLine = sectionLines["## Guests"] + 1;
      while (
        currentLine < lines.length &&
        !lines[currentLine].startsWith("##")
      ) {
        const line = lines[currentLine].trim();
        if (line && !line.match(markdownLinkRegex)) {
          errors.push({
            line: currentLine + 1,
            message: `Invalid guest format: "${line}". Expected format: "- [Name](link)"`,
          });
        }
        currentLine++;
      }
    }

    // Validate Notes format and make sure every line represents a valid note format
    if (sectionLines["## Notes"] !== -1) {
      let currentLine = sectionLines["## Notes"] + 1;
      while (
        currentLine < lines.length &&
        !lines[currentLine].startsWith("##")
      ) {
        const line = lines[currentLine].trim();
        if (line && !line.match(/^[0-9]?[0-9]:[0-9]{2}:[0-9]{2} - .+/)) {
          errors.push({
            line: currentLine + 1,
            message: `Invalid note format: "${line}". Expected format: "HH:MM:SS - Description"`,
          });
        }
        currentLine++;
      }
    }

    // Validate Links format and make sure every line represents a valid link format
    if (sectionLines["## Links"] !== -1) {
      let currentLine = sectionLines["## Links"] + 1;
      while (
        currentLine < lines.length &&
        !lines[currentLine].startsWith("##")
      ) {
        const line = lines[currentLine].trim();
        if (line && !line.match(markdownLinkRegex)) {
          errors.push({
            line: currentLine + 1,
            message: `Invalid link format: "${line}". Expected format: "[Title](url)"`,
          });
        }
        currentLine++;
      }
    }

    // Update host format validation and make sure every line represents a valid presenter format
    if (sectionLines["## Prepared and Presented by"] !== -1) {
      let currentLine = sectionLines["## Prepared and Presented by"] + 1;
      while (
        currentLine < lines.length &&
        !lines[currentLine].startsWith("##")
      ) {
        const line = lines[currentLine].trim();
        if (line && !line.match(markdownLinkRegex)) {
          errors.push({
            line: currentLine + 1,
            message: `Invalid presenter format: "${line}". Expected format: "[Name](link)" or "- [Name](link)"`,
          });
        }
        currentLine++;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  } catch (error) {
    errors.push({
      line: 0,
      message: `Failed to read or parse episode file: ${error.message}`,
    });
    return {
      isValid: false,
      errors,
    };
  }
}

// Get episode number from command line argument
const episodeNumber = process.argv[2];
if (!episodeNumber) {
  console.error("Please provide an episode number");
  process.exit(1);
}

const main = async () => {
  let hasErrors = false;
  let totalErrors = 0;

  for (let i = 1; i <= 192; i++) {
    const paddedNumber = String(i).padStart(4, "0");
    const { isValid, errors } = validateEpisodeMarkdown(paddedNumber);

    if (!isValid) {
      hasErrors = true;
      console.error(`\nValidation failed for episode ${paddedNumber}. Errors:`);
      errors.forEach(error => {
        totalErrors++;
        console.error(`Line ${error.line}: ${error.message}`);
      });
      console.error("\n");
    }
  }

  console.log(`Total errors: ${totalErrors}`);

  if (hasErrors) {
    process.exit(1);
  }
};

main();
