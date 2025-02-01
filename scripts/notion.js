// scripts/notion.js
import { Client } from "@notionhq/client";
import "dotenv/config";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const NOTION_KEY = process.env.NOTION_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const OUTPUT_PATH = path.join(dirname(__dirname), "src", "data", "themes.json");

if (!NOTION_KEY || !DATABASE_ID) {
  console.error(
    "Missing required environment variables: NOTION_KEY or DATABASE_ID"
  );
  process.exit(1);
}

const notion = new Client({ auth: NOTION_KEY });

async function fetchAllThemes() {
  try {
    let allThemes = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        start_cursor: startCursor,
        page_size: 100, // Maximum allowed by Notion
        sorts: [{ property: "Theme Name", direction: "ascending" }],
      });

      const themes = response.results.map((page) => ({
        name: page.properties["Theme Name"].title[0]?.plain_text || "",
        systemNavigation:
          page.properties["System Navigation"].rich_text[0]?.plain_text || "",
        selectedItems:
          page.properties["Selected Items"].rich_text[0]?.plain_text || "",
        presenceIndication:
          page.properties["Presence Indication"].rich_text[0]?.plain_text || "",
        notifications:
          page.properties["Notifications"].rich_text[0]?.plain_text || "",
        windowGradient: page.properties["Window Gradient"].checkbox,
        darkerSidebars: page.properties["Darker Sidebars"].checkbox,
        submitterName:
          page.properties["Submitter Name"].rich_text[0]?.plain_text || "",
        submitterLink: page.properties["Submitter Link"].url || "",
        tags: page.properties["Tags"].multi_select.map((tag) => tag.name),
      }));

      allThemes = [...allThemes, ...themes];

      hasMore = response.has_more;
      startCursor = response.next_cursor;

      console.log(
        `Fetched ${themes.length} themes (total: ${allThemes.length})`
      );
    }

    return allThemes;
  } catch (error) {
    console.error("Error fetching themes from Notion:", error);
    throw error;
  }
}

async function saveThemes(themes) {
  try {
    await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(themes, null, 2));
    console.log(`Successfully wrote ${themes.length} themes to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Error saving themes:", error);
    throw error;
  }
}

async function main() {
  try {
    const themes = await fetchAllThemes();
    await saveThemes(themes);
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  }
}

main();
