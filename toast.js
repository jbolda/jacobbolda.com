import { sourceMdx } from "@toastdotdev/mdx";
import { sourceAirtable } from "./fetch/fetch-airtable.js";
import { sourceDraftArticles } from "./fetch/fetch-draft-articles.js";
import fetch from "node-fetch";

import { promises as fs, createWriteStream } from "fs";
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

export const sourceData = async ({ setDataForSlug }) => {
  console.time(`fetch content`);
  try {
    await fs.access("./public/images");
  } catch (error) {
    await fs.mkdir("./public/images");
  }

  console.time(`source recipes from Airtable`);
  const { Recipes: recipes } = await sourceAirtable({
    tables: recipeTables,
  }).then(async (query) => ({
    ...query,
    Recipes: await Promise.all(
      query.Recipes.map(async (recipe) => {
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

        const imageUrlOG = recipe.images[0].thumbnails.large.url;
        const imageUrl = `/images/${imageUrlOG
          .split("/")
          .pop()}.${recipe.images[0].type.split("/").pop()}`;

        if (!query.cache)
          await fetch(imageUrlOG).then((res) =>
            res.body.pipe(createWriteStream(`./public${imageUrl}`))
          );
        recipe.imageUrl = imageUrl;

        return recipe;
      })
    ),
  }));
  console.timeEnd(`source recipes from Airtable`);

  console.time(`source site metadata from Airtable`);
  const { uses, curate } = await sourceAirtable({ tables: websiteTables });
  console.timeEnd(`source site metadata from Airtable`);

  console.time(`source draft articles from Google Drive`);
  const drafts = await sourceDraftArticles().then(async () => {
    const data = await sourceMdx({
      setDataForSlug,
      directory: "./content/drafts",
      slugPrefix: "/",
      remarkPlugins,
    });
    return data.sort(sortByDate);
  });
  console.timeEnd(`source draft articles from Google Drive`);

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

  for (let page of [...drafts, ...articles, ...notes]) {
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
  const curated = [...drafts, ...articles, ...notes].reduce(
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
    data: {
      articlesCurated: curated,
      articlesRecent: [...drafts, ...articles, ...notes]
        .sort(sortByDate)
        .slice(0, 9),
      pageType: "page",
    },
  });

  await setDataForSlug("/about", {
    data: { pageType: "page" },
  });

  await setDataForSlug("/uses", {
    data: { uses, pageType: "page" },
  });

  await setDataForSlug("/articles", {
    data: { articles: [...articles, ...notes], pageType: "article" },
  });

  await setDataForSlug("/garden", {
    data: {
      articles,
      notes,
      drafts,
      pageType: "article",
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
