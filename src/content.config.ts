import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { sourceDraftArticles } from "../content-loaders/load-draft-articles";
import { sourceContentApi } from "../content-loaders/load-content-api";
import { cooklangLoader } from "../content-loaders/load-cooklang";

const articleSchema = z.object({
  title: z.string(),
  progress: z.enum(["seed", "growth", "article"]).optional(),
  written: z.union([z.date(), z.string()]),
  updated: z.union([z.date(), z.string()]).optional(),
  category: z.string().optional(),
  description: z.string(),
  slug: z.string().optional(),
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

const contentApiBase =
  import.meta.env.CONTENT_API_URL || "https://content-api.jbolda.workers.dev";

const uses = defineCollection({
  loader: sourceContentApi({
    endpoint: `${contentApiBase}/uses`,
    idField: "title",
  }),
  schema: z.object({
    title: z.string(),
    url: z.string().optional(),
    subtitle: z.string(),
  }),
});

const curated = defineCollection({
  loader: sourceContentApi({
    endpoint: `${contentApiBase}/curated`,
    idField: "url",
  }),
  schema: z.object({
    url: z.string(),
    order: z.number(),
  }),
});

const recipes = defineCollection({
  loader: cooklangLoader(),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    servings: z.string().nullable().optional(),
    time: z.string().nullable().optional(),
    source: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.string().nullable(),
        units: z.string().nullable(),
      })
    ),
    cookware: z.array(
      z.object({
        name: z.string(),
        quantity: z.string().nullable(),
      })
    ),
    sections: z.array(
      z.object({
        name: z.string().nullable(),
        steps: z.array(
          z.array(
            z.union([
              z.object({
                type: z.literal("ingredient"),
                name: z.string(),
                quantity: z.string().nullable(),
                units: z.string().nullable(),
              }),
              z.object({
                type: z.literal("cookware"),
                name: z.string(),
                quantity: z.string().nullable(),
              }),
              z.object({
                type: z.literal("timer"),
                quantity: z.string().nullable(),
                units: z.string().nullable(),
                name: z.string().nullable(),
              }),
              z.object({
                type: z.literal("text"),
                value: z.string(),
              }),
            ])
          )
        ),
      })
    ),
  }),
});

export const collections = {
  articles,
  notes,
  drafts,
  engagements,
  uses,
  curated,
  recipes,
};
