import { existsSync, mkdirSync, cpSync, readdirSync, rmSync } from "fs";
import { join, resolve, relative, extname, dirname } from "path";
import * as p from "@clack/prompts";
import { parse } from "@bomb.sh/args";

const REPO_RECIPES_DIR = join(process.cwd(), "src", "content", "recipes");
const VAULT_RECIPES_FOLDER = "recipes";
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

const flags = parse(process.argv.slice(2), {
  boolean: ["back", "all"],
  array: ["recipe"],
  default: { back: false, all: false, recipe: [] },
});
const toVault = flags.back;
const all = flags.all;
const recipeArgs = (flags.recipe ?? []) as string[];
const vaultPathArg = Array.isArray(flags._) ? (flags._[0] as string) : (flags._ as string);

function isRecipeFile(file: string): boolean {
  return extname(file) === ".cook" || IMAGE_EXTENSIONS.includes(extname(file).toLowerCase());
}

function collectFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, acc);
    } else {
      acc.push(fullPath);
    }
  }
  return acc;
}

function matchRecipe(wanted: string, relatives: string[]): string | undefined {
  const normalized = wanted.replace(/\.cook$/i, "").replace(/^\.?\//, "").toLowerCase();
  return relatives.find((rel) => {
    const withoutExt = rel.replace(/\.cook$/i, "").toLowerCase();
    return withoutExt === normalized || basenameOf(rel).toLowerCase() === normalized;
  });
}

function basenameOf(rel: string): string {
  return rel.slice(rel.lastIndexOf("/") + 1).replace(/\.cook$/i, "");
}

async function copyToVault(vaultRecipesDir: string) {
  const cooks = collectFiles(REPO_RECIPES_DIR).filter((f) => extname(f) === ".cook");
  if (cooks.length === 0) {
    p.cancel(`No recipes found in ${REPO_RECIPES_DIR}`);
    process.exit(1);
  }

  const relatives = cooks.map((f) => relative(REPO_RECIPES_DIR, f));

  let selected: string[];
  if (all) {
    selected = relatives;
  } else if (recipeArgs.length > 0) {
    selected = [];
    for (const wanted of recipeArgs) {
      const match = matchRecipe(wanted, relatives);
      if (!match) {
        p.cancel(`No recipe matched "${wanted}"`);
        process.exit(1);
      }
      if (!selected.includes(match)) selected.push(match);
    }
  } else {
    const chosen = await p.multiselect({
      message: "Which recipes should go back to the vault?",
      options: relatives
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .map((rel) => ({ value: rel, label: rel.replace(/\.cook$/i, "") })),
    });
    if (p.isCancel(chosen) || chosen.length === 0) {
      p.cancel("Nothing selected");
      process.exit(0);
    }
    selected = chosen;
  }

  for (const rel of selected) {
    mkdirSync(dirname(join(vaultRecipesDir, rel)), { recursive: true });
    cpSync(join(REPO_RECIPES_DIR, rel), join(vaultRecipesDir, rel));

    const stem = rel.replace(/\.cook$/i, "");
    const images = IMAGE_EXTENSIONS.map((ext) => `${stem}${ext}`).filter((candidate) =>
      existsSync(join(REPO_RECIPES_DIR, candidate)),
    );
    for (const image of images) {
      cpSync(join(REPO_RECIPES_DIR, image), join(vaultRecipesDir, image));
    }

    p.log.step(`Copied ${stem.replace(/\.cook$/i, "")}${images.length ? " (+ image)" : ""}`);
  }
  p.outro(`Copied ${selected.length} recipe(s) to the vault`);
}

async function syncFromVault(vaultRecipesDir: string) {
  if (existsSync(REPO_RECIPES_DIR)) {
    rmSync(REPO_RECIPES_DIR, { recursive: true });
  }
  mkdirSync(REPO_RECIPES_DIR, { recursive: true });

  const files = collectFiles(vaultRecipesDir).filter(isRecipeFile);
  for (const file of files) {
    const dest = join(REPO_RECIPES_DIR, relative(vaultRecipesDir, file));
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(file, dest);
  }

  const images = files.filter(isImage).length;
  p.outro(`Synced ${files.length - images} recipes and ${images} images from ${vaultRecipesDir}`);
}

function isImage(file: string): boolean {
  return IMAGE_EXTENSIONS.includes(extname(file).toLowerCase());
}

async function main() {
  p.intro("copy recipes");

  if (!vaultPathArg) {
    p.cancel("Usage: copy-recipes <vault-path> [--back] [--all] [--recipe <name>]");
    process.exit(1);
  }
  const vaultPath = resolve(vaultPathArg);
  const vaultRecipesDir = join(vaultPath, VAULT_RECIPES_FOLDER);

  if (toVault) {
    if (!existsSync(REPO_RECIPES_DIR)) {
      p.cancel(`No recipes in repo at ${REPO_RECIPES_DIR}`);
      process.exit(1);
    }
    await copyToVault(vaultRecipesDir);
  } else {
    if (!existsSync(vaultRecipesDir)) {
      p.cancel(`Recipes folder not found at ${vaultRecipesDir}`);
      process.exit(1);
    }
    await syncFromVault(vaultRecipesDir);
  }
}

main().catch((error) => {
  p.cancel(`Copy failed: ${error.message}`);
  process.exit(1);
});
