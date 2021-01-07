import { sourceMdx } from "@toastdotdev/mdx";
import { sourceAirtableRecipes } from "./fetch/fetch-airtable-recipes.js";

export const sourceData = async ({ setDataForSlug }) => {
  const { Recipes: recipes } = await sourceAirtableRecipes({ tables });

  const articles = await sourceMdx({
    setDataForSlug,
    directory: "./content/articles",
    slugPrefix: "/",
  });

  const notes = await sourceMdx({
    setDataForSlug,
    directory: "./content/notes",
    slugPrefix: "/",
  });

  for (let page of [...articles, ...notes]) {
    await setDataForSlug(`/${page.meta.slug}`, {
      data: { pageType: "article" },
    });
  }

  const homepage = await sourceMdx({
    setDataForSlug,
    directory: "./content/homepage",
    slugPrefix: "/an-extra-boop-for-the-homepage/",
  });

  await setDataForSlug("/", {
    data: { articles: [...articles, ...notes], pageType: "page" },
  });

  await setDataForSlug("/articles", {
    data: { articles: [...articles, ...notes], pageType: "page" },
  });

  await setDataForSlug("/recipes", {
    data: { recipes, pageType: "page" },
  });

  return;
};

const tables = [
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
