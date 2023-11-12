import { defineCollection, reference, z } from "astro:content";

const articleSchema = z.object({
  title: z.string(),
  written: z.union([z.date(), z.string()]),
  updated: z.union([z.date(), z.string()]).optional(),
  category: z.string().optional(),
  description: z.string(),
  relatedPosts: z.array(reference("articles")).optional(),
});

const articles = defineCollection({
  type: "content",
  schema: articleSchema,
});
const notes = defineCollection({
  type: "content",
  schema: articleSchema,
});

export const collections = { articles, notes };
