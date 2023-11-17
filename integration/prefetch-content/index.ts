import type { AstroIntegration } from "astro";
import { sourceAirtable } from "./fetch-airtable.ts";
import { promises as fs, createWriteStream } from "node:fs";
import fetch from "node-fetch";
import { sourceDraftArticles } from "./fetch-draft-articles.ts";

export default function createPlugin(): AstroIntegration {
  return {
    name: "@astrojs/partytown",
    hooks: {
      "astro:config:setup": async ({
        config: _config,
        command: _command,
        injectScript: _injectScript,
      }) => {
        const cache = !!process.env.SITE_FILE_CACHE ?? false;
        await sourceUses(cache);
        await sourceCurated(cache);
        await sourceRecipes(cache);
        await sourceDraftArticles(cache);
      },
    },
  };
}

const objToYamlFrontmatter = (obj: Record<string, any>, filters: string[]) => {
  const frontmatterList = [] as string[];
  for (const key of Object.keys(obj)) {
    if (!filters.includes(key)) {
      const value = obj[key];
      if (typeof value === "string") {
        frontmatterList.push(`${key}: ${value}`);
      } else if (Array.isArray(value)) {
        frontmatterList.push(`${key}:\n  - ${value.join(`\n  - `)}`);
      }
    }
  }
  return `---\n` + frontmatterList.join("\n") + `\n---\n\n`;
};

const sourceUses = async (cache: boolean) => {
  console.time(`source uses from Airtable`);
  const usesBase = {
    baseId: `appQ4j8G66ikJyYjY`,
    tableName: `uses`,
    queryName: `uses`,
  };
  const usesWriter = async ({ uses }, contentPath) => {
    for (const use of uses) {
      const content =
        objToYamlFrontmatter(use, ["description"]) + use.description;
      await fs.writeFile(`${contentPath}/${use.title}.mdx`, content);
    }
  };
  await sourceAirtable("uses", [usesBase], usesWriter, cache);
  console.timeEnd(`source uses from Airtable`);
};

const sourceCurated = async (cache: boolean) => {
  console.time(`source curated from Airtable`);
  const curatedBase = {
    baseId: `appQ4j8G66ikJyYjY`,
    tableName: `curate`,
    queryName: `curate`,
  };
  await sourceAirtable("curated", [curatedBase], null, cache);
  console.timeEnd(`source curated from Airtable`);
};

const sourceRecipes = async (cache: boolean) => {
  console.time(`source recipes from Airtable`);
  const recipeTables = [
    {
      baseId: `appcL6Jdj7ZrhTg4q`,
      tableName: `Recipes`,
      tableView: `List`,
      queryName: `Recipes`,
    },
    {
      baseId: `appcL6Jdj7ZrhTg4q`,
      tableName: `Cooking Method`,
      tableView: `Main View`,
      queryName: `Cooking Method`,
    },
    {
      baseId: `appcL6Jdj7ZrhTg4q`,
      tableName: `Style`,
      tableView: `Main View`,
      queryName: `Style`,
    },
  ];
  const recipeWriter = async (recipeBook, contentPath) => {
    await ensureDir(`${contentPath}Styles`);
    await fs.writeFile(
      `${contentPath}Styles/styles.json`,
      `${JSON.stringify(recipeBook["Style"], null, 2)}\n`
    );
    await ensureDir(`${contentPath}CookingMethods`);
    await fs.writeFile(
      `${contentPath}CookingMethods/cooking-methods.json`,
      `${JSON.stringify(recipeBook["Cooking Method"], null, 2)}\n`
    );
    const recipes = recipeBook["Recipes"];
    await ensureDir(`${contentPath}s`);
    for (const recipe of recipes) {
      const imageUrlOG = recipe.images[0].thumbnails.large.url;
      const imageUrl = `${recipe.name
        .toLowerCase()
        .replace(/ /g, "-")}.${recipe.images[0].type.split("/").pop()}`;

      if (!cache)
        await fetch(imageUrlOG).then((res) =>
          res.body.pipe(createWriteStream(`${contentPath}s/${imageUrl}`))
        );

      const content =
        objToYamlFrontmatter({ ...recipe, image: `./${imageUrl}` }, [
          "images",
          "ingredients",
          "directions",
        ]) +
        "### Ingredients\n\n" +
        recipe.ingredients +
        "\n\n" +
        "### Directions\n\n" +
        recipe.directions;
      await fs.writeFile(
        `${contentPath}s/${recipe.name.toLowerCase().replace(/ /g, "-")}.mdx`,
        content
      );
    }
  };
  await sourceAirtable("recipe", recipeTables, recipeWriter, cache);
  console.timeEnd(`source recipes from Airtable`);
};

const ensureDir = async (dir: string) => {
  try {
    await fs.mkdir(dir);
  } catch (error) {
    // noop
  }
};
