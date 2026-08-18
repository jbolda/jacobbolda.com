import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { sourceDraftArticles } from "../content-loaders/load-draft-articles";
import { sourceAirtable } from "../content-loaders/load-airtable";

const articleSchema = z.object({
  title: z.string(),
  progress: z.enum(["seed", "growth", "article"]).optional(),
  written: z.union([z.date(), z.string()]),
  updated: z.union([z.date(), z.string()]).optional(),
  category: z.string().optional(),
  description: z.string(),
  relatedArticles: z.array(reference("articles")).optional(),
  keywords: z.string().array().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: articleSchema,
});
const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: articleSchema,
});
const drafts = defineCollection({
  loader: sourceDraftArticles(false),
  schema: articleSchema,
});
const engagements = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/engagements" }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    description: z.string(),
  }),
});

const uses = defineCollection({
  loader: sourceAirtable({
    bases: [
      {
        baseId: `appQ4j8G66ikJyYjY`,
        tableName: `uses`,
        queryName: `uses`,
      },
    ],
  }),
  schema: z.object({
    title: z.string(),
    url: z.string().optional(),
    subtitle: z.string(),
  }),
});

const curated = defineCollection({
  loader: sourceAirtable({
    bases: [
      {
        baseId: `appQ4j8G66ikJyYjY`,
        tableName: `curate`,
        queryName: `curate`,
      },
    ],
  }),
  schema: z.object({
    url: z.string(),
    order: z.number(),
  }),
});

const recipes = defineCollection({
  loader: sourceAirtable({
    bases: [
      {
        baseId: `appcL6Jdj7ZrhTg4q`,
        tableName: `Recipes`,
        tableView: `List`,
        queryName: `Recipes`,
      },
    ],
    slugField: "name",
  }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    ingredients: z.string(),
    directions: z.string(),
    images: z
      .array(
        z.object({
          id: z.string(),
          width: z.number(),
          height: z.number(),
          url: z.string().url(),
          filename: z.string(),
          size: z.number(),
          type: z.string(),
          thumbnail: z.any(),
        })
      )
      .optional(),
    "cooking method": z.string().array().optional(),
    style: z.string().array().optional(),
    inspiration: z.string().url().optional(),
    "last made": z.coerce.date().optional(),
    rating: z.number().optional(),
    "cooking time": z.number().optional(),
    "preparation time": z.number().optional(),
    "total time": z.number().optional(),
  }),
});

const recipeStyles = defineCollection({
  loader: sourceAirtable({
    bases: [
      {
        baseId: `appcL6Jdj7ZrhTg4q`,
        tableName: `Style`,
        tableView: `Main View`,
        queryName: `Style`,
      },
    ],
  }),
  schema: z.object({
    Name: z.string(),
    Recipes: z.string().array().optional(),
  }),
});

const recipeCookingMethods = defineCollection({
  loader: sourceAirtable({
    bases: [
      {
        baseId: `appcL6Jdj7ZrhTg4q`,
        tableName: `Cooking Method`,
        tableView: `Main View`,
        queryName: `Cooking Method`,
      },
    ],
  }),
  schema: z.object({ Name: z.string(), Recipes: z.string().array() }),
});

export const collections = {
  articles,
  notes,
  drafts,
  engagements,
  uses,
  curated,
  recipes,
  recipeStyles,
  recipeCookingMethods,
};
