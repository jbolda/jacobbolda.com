import type { Loader } from "astro/loaders";
import { CooklangParser, getQuantityUnit } from "@cooklang/cooklang";
import { glob } from "node:fs/promises";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

// Decodes the parser's quantity AST into the value as written in the source which works around a bug in the cooklang parser
type NumShape = { type: "regular"; value: number } | { type: "fraction"; value: { whole: number; num: number; den: number } };
type ValueShape = { type: "number"; value: NumShape } | { type: "range"; value: { start: NumShape; end: NumShape } } | { type: "text"; value: string };

function toQuantity(value: unknown): string | null {
  const v = value as ValueShape | null | undefined;
  if (!v) return null;
  if (v.type === "range") {
    const start = toQuantity({ type: "number", value: v.value.start });
    const end = toQuantity({ type: "number", value: v.value.end });
    return start && end ? `${start}-${end}` : start;
  }
  if (v.type === "number") {
    if (v.value.type === "regular") return `${v.value.value}`;
    if (v.value.type === "fraction") {
      const { whole, num, den } = v.value.value;
      if (num === 0) return `${whole}`;
      return whole > 0 ? `${whole} ${num}/${den}` : `${num}/${den}`;
    }
  }
  return null;
}

function toSafeString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

type StepItem =
  | { type: "ingredient"; name: string; quantity: string | null; units: string | null }
  | { type: "cookware"; name: string; quantity: string | null }
  | { type: "timer"; quantity: string | null; units: string | null; name: string | null }
  | { type: "text"; value: string };

export function cooklangLoader({
  pattern = "src/content/recipes/**/*.cook",
}: {
  pattern?: string;
} = {}): Loader {
  return {
    name: "cooklang-loader",
    load: async ({ store, parseData, generateDigest, logger }) => {
      const parser = new CooklangParser();
      const files: string[] = [];
      for await (const file of glob(pattern)) {
        files.push(file);
      }

      for (const file of files) {
        const content = await readFile(file, "utf-8");
        const id = basename(file, ".cook");
        const recipeDir = dirname(file);

        // images are next to the .cook file, named after it (e.g., recipe-name.jpg)
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        let imagePath: string | null = null;

        for (const ext of imageExtensions) {
          const candidatePath = join(recipeDir, `${id}.${ext}`);
          if (existsSync(candidatePath)) {
            imagePath = candidatePath;
            break;
          }
        }

        try {
          const [recipe] = parser.parse(content);

          const stepItems = (items: unknown[]) =>
            items
              .map((item): StepItem | null => {
                const typed = item as {
                  type: string;
                  index?: number;
                  value?: string;
                };
                if (typed.type === "ingredient") {
                  const ing = recipe.ingredients[typed.index ?? -1];
                  if (!ing) return null;
                  return {
                    type: "ingredient",
                    name: ing.name,
                    quantity: toQuantity(ing.quantity?.value),
                    units: getQuantityUnit(ing.quantity),
                  };
                } else if (typed.type === "cookware") {
                  const cw = recipe.cookware[typed.index ?? -1];
                  if (!cw) return null;
                  return {
                    type: "cookware",
                    name: cw.name,
                    quantity: toQuantity(cw.quantity?.value),
                  };
                } else if (typed.type === "timer") {
                  const timer = recipe.timers[typed.index ?? -1];
                  if (!timer) return null;
                  return {
                    type: "timer",
                    quantity: toQuantity(timer.quantity?.value),
                    units: getQuantityUnit(timer.quantity),
                    name: toSafeString(timer.name),
                  };
                } else if (typed.type === "text") {
                  return { type: "text", value: typed.value ?? "" };
                }
                return null;
              })
              .filter((item): item is StepItem => item !== null);

          const data = await parseData({
            id,
            data: {
              title: recipe.title || id,
              description: recipe.description ?? null,
              servings: recipe.servings != null ? String(recipe.servings) : null,
              time:
                typeof recipe.time === "number"
                  ? String(recipe.time)
                  : recipe.time
                    ? [
                        recipe.time.prep_time != null ? `prep: ${recipe.time.prep_time}` : null,
                        recipe.time.cook_time != null ? `cook: ${recipe.time.cook_time}` : null,
                      ]
                        .filter(Boolean)
                        .join(", ") || null
                    : null,
              source: toSafeString(recipe.source?.url) ?? toSafeString(recipe.source?.name),
              image: imagePath ? basename(imagePath) : null,
              ingredients: recipe.ingredients.map((ing) => ({
                name: ing.name,
                quantity: toQuantity(ing.quantity?.value),
                units: getQuantityUnit(ing.quantity),
              })),
              cookware: recipe.cookware.map((cw) => ({
                name: cw.name,
                quantity: toQuantity(cw.quantity?.value),
              })),
              sections: recipe.sections.map((section) => ({
                name: section.name ?? null,
                steps: section.content
                  .filter((item) => item.type === "step")
                  .map((step) => stepItems((step as { value: { items: unknown[] } }).value.items))
                  .filter((items) => items.length > 0),
              })),
            },
          });

          const digest = generateDigest(data);
          store.set({ id, data, digest });
        } catch (error) {
          logger.error(`Failed to parse ${file}: ${error}`);
        }
      }
    },
  };
}
