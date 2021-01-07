/* @jsx h */
import { h } from "preact";

export default (props) => (
  <RecipeSection>
    {props.recipes.map((recipe) => (
      <RecipeWrap recipe={recipe} />
    ))}
  </RecipeSection>
);

const RecipeSection = ({ children }) => (
  <div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Recipes
        </h2>
      </div>
      <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const RecipeWrap = ({ recipe }) => (
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      {recipe.images.map((recipeImage) => (
        <img
          src={recipeImage.thumbnails.full.url}
          class="h-48 w-full object-cover"
        />
      ))}
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <a href={"recipe.meta.slug"} class="mt-2 block">
          <p class="text-xl font-semibold text-gray-900">{recipe.name}</p>
          <p class="mt-3 text-base text-gray-500">{recipe.ingredients}</p>
        </a>
        <div class="mt-3">
          <a
            href={"recipe.meta.slug"}
            class="text-base font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Read full story
          </a>
        </div>
      </div>
    </div>
  </div>
);
