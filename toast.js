import { sourceMdx } from "@toastdotdev/mdx";
import { sourceAirtable } from "./fetch/fetch-airtable.js";
import { sourceDraftArticles } from "./fetch/fetch-draft-articles.js";

import { promises as fs } from "fs";
import remarkWikiLink from "remark-wiki-link";
const remarkPlugins = [
  [
    remarkWikiLink.wikiLinkPlugin,
    {
      hrefTemplate: (permalink) => `/${permalink}`,
      wikiLinkClassName:
        "text-base font-semibold text-primary-600 dark:text-primary-300 hover:text-primary-300",
    },
  ],
];

const sortByDate = (object1, object2) => {
  const o1date = !object1.meta.updated
    ? object1.meta.written
    : object1.meta.updated;
  if (!o1date) return 1;
  const o2date = !object2.meta.updated
    ? object2.meta.written
    : object2.meta.updated;
  if (!o2date) return -1;
  return new Date(o2date) > new Date(o1date) ? 1 : -1;
};

console.time(`fetch content`);
export const sourceData = async ({ setDataForSlug }) => {
  const { Recipes: recipes } = await sourceAirtable({
    tables: recipeTables,
  }).then((query) => ({
    ...query,
    Recipes: query.Recipes.map((recipe) => {
      recipe.slug = `/${recipe.name
        .replace(/ /g, "-")
        .replace(/[,&]/g, "")
        .toLowerCase()}`;

      recipe.ingredientsHTML = `<li>${recipe.ingredients
        .replace(/(- )/g, "")
        .replace(/[\n\r]+/g, "</li><li>")}</li>`;
      recipe.directionsHTML = `<li>${recipe.directions
        .replace(/(^[1-9]\. )/gm, "")
        .replace(/[\n\r]+/g, "</li><li>")}</li>`;
      return recipe;
    }),
  }));

  const { uses, curate } = await sourceAirtable({ tables: websiteTables });

  const drafts = await sourceDraftArticles().then(async () => {
    const data = await sourceMdx({
      setDataForSlug,
      directory: "./content/drafts",
      slugPrefix: "/",
      remarkPlugins,
    });
    return data.sort(sortByDate);
  });

  console.timeEnd(`fetch content`);

  const articles = await sourceMdx({
    setDataForSlug,
    directory: "./content/articles",
    slugPrefix: "/",
    remarkPlugins,
  }).then((data) => data.sort(sortByDate));

  const notes = await sourceMdx({
    setDataForSlug,
    directory: "./content/notes",
    slugPrefix: "/",
    remarkPlugins,
  }).then((data) => data.sort(sortByDate));

  const pages = await sourceMdx({
    setDataForSlug,
    directory: "./content/pages",
    slugPrefix: "/",
    remarkPlugins,
  });

  for (let page of [...articles, ...notes, ...drafts]) {
    await setDataForSlug(`/${page.meta.slug}`, {
      data: { pageType: "article", ...page.meta },
    });
  }

  const homepage = await sourceMdx({
    setDataForSlug,
    directory: "./content/homepage",
    slugPrefix: "/an-extra-boop-for-the-homepage/",
    remarkPlugins,
  });

  const curate_list = curate
    .sort((a, b) => a.order - b.order)
    .map((item) => item.url);
  const curated = [...articles, ...notes, ...drafts].reduce(
    (curate, article) => {
      if (curate_list.includes(article.meta.slug)) {
        curate[curate_list.findIndex((item) => item === article.meta.slug)] =
          article;
      }
      return curate;
    },
    curate_list
  );

  await setDataForSlug("/", {
    data: { articles: curated, pageType: "page" },
  });

  await setDataForSlug("/about", {
    data: { pageType: "article" },
  });

  await setDataForSlug("/uses", {
    data: { uses, pageType: "page" },
  });

  await setDataForSlug("/articles", {
    data: { articles: [...articles, ...notes], pageType: "page" },
  });

  await setDataForSlug("/garden", {
    data: {
      articles,
      notes,
      drafts,
      pageType: "page",
    },
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

const websiteTables = [
  {
    baseId: `appQ4j8G66ikJyYjY`,
    tableName: `uses`,
    queryName: `uses`,
  },
  {
    baseId: `appQ4j8G66ikJyYjY`,
    tableName: `curate`,
    queryName: `curate`,
  },
];
