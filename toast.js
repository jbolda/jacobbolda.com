import { sourceMdx, compileMdx } from "@toastdotdev/mdx";
import { sourceAirtableRecipes } from "./fetch/fetch-airtable-recipes.js";

import { promises as fs } from "fs";

export const sourceData = async ({ setDataForSlug }) => {
  const { Recipes: recipes } = await sourceAirtableRecipes({ tables }).then(
    (query) => ({
      ...query,
      Recipes: query.Recipes.map((recipe) => {
        recipe.slug = `/${recipe.name
          .replace(/ /g, "-")
          .replace(/[,&]/g, "")
          .toLowerCase()}/`;

        recipe.ingredientsHTML = `<ul><li>${recipe.ingredients
          .replace(/(- )/g, "")
          .replace(/[\n\r]+/g, "</li><li>")}</li></ul>`;
        recipe.directionsHTML = `<ol><li>${recipe.directions.replace(
          /[\n\r]+/g,
          "</li><li>"
        )}</li></ol>`;
        return recipe;
      }),
    })
  );

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

  const recipeComponent = await fs.readFile("./src/components/recipe.js", {
    encoding: "utf-8",
  });
  for (let recipe of recipes) {
    await setDataForSlug(recipe.slug, {
      data: {
        recipe,
        pageType: "page",
      },
      component: {
        mode: "source",
        value: recipeComponent,
      },
    });
  }

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
