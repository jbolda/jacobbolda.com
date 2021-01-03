import { sourceMdx } from "@toastdotdev/mdx";

export const sourceData = async ({ setDataForSlug }) => {
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

  return;
};
