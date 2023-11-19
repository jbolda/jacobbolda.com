import { defineCollection, reference, z } from "astro:content";

const articleSchema = z.object({
  title: z.string(),
  written: z.union([z.date(), z.string()]),
  updated: z.union([z.date(), z.string()]).optional(),
  category: z.string().optional(),
  description: z.string(),
  relatedPosts: z.array(reference("articles")).optional(),
  keywords: z.string().array().optional(),
});

const articles = defineCollection({
  type: "content",
  schema: articleSchema,
});
const notes = defineCollection({
  type: "content",
  schema: articleSchema,
});
const drafts = defineCollection({
  type: "content",
  schema: articleSchema,
});
const engagements = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    description: z.string(),
  }),
});

const uses = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    url: z.string().optional(),
    subtitle: z.string(),
  }),
});

const curated = defineCollection({
  type: "data",
  schema: z.object({
    curate: z.object({ url: z.string(), order: z.number() }).array(),
  }),
});

const recipes = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image().optional(),
      "cooking method": z.string().array().optional(),
      style: z.string().array().optional(),
      inspiration: z.string().url().optional(),
      "last made": z.date().optional(),
      rating: z.number().optional(),
      "cooking time": z.number().optional(),
      "preparation time": z.number().optional(),
      "total time": z.number().optional(),
    }),
});

const recipeStyles = defineCollection({
  type: "data",
  schema: z
    .object({ Name: z.string(), Recipes: z.string().array().optional() })
    .array(),
});

const recipeCookingMethods = defineCollection({
  type: "data",
  schema: z.object({ Name: z.string(), Recipes: z.string().array() }).array(),
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
