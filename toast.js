import { sourceMdx } from "@toastdotdev/mdx";

export const sourceData = async ({ setDataForSlug }) => {
  await sourceMdx({
    setDataForSlug,
    directory: "./content/articles",
    slugPrefix: "/",
  });

  await sourceMdx({
    setDataForSlug,
    directory: "./content/notes",
    slugPrefix: "/",
  });

  return;
};
