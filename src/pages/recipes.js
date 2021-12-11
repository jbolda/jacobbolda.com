import { h } from "preact";
import { Helmet } from "react-helmet";
import List from "./../components/list.js";
import Heading from "./../components/heading.js";
import Link from "./../components/link.js";

export default (props) => (
  <RecipeSection>
    <Helmet>
      <title>Recipes</title>
      <meta
        property="description"
        content="We like to cook. We particularly like to cook these recipes. Hopefully you find these of mutual interest."
      />
    </Helmet>
    {props.recipes.map((recipe) => (
      <RecipeWrap recipe={recipe} />
    ))}
  </RecipeSection>
);

const RecipeSection = ({ children }) => (
  <div class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <Heading
          as="h2"
          class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl"
        >
          Recipes
        </Heading>
      </div>
      <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const RecipeWrap = ({ recipe }) => (
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="shrink-0">
      {recipe.images.map((recipeImage) => (
        <img
          src={recipeImage.thumbnails.full.url}
          class="h-48 w-full object-cover"
        />
      ))}
    </div>
    <div class="flex-1 p-6 flex flex-col justify-between">
      <div class="flex-1">
        <Link href={recipe.slug} flair="none">
          <Heading as="h3">{recipe.name}</Heading>
          <List
            as="ul"
            dangerouslySetInnerHTML={{ __html: recipe.ingredientsHTML }}
          />
        </Link>
        <div class="mt-3">
          <Link href={recipe.slug}>check out recipe</Link>
        </div>
      </div>
    </div>
  </div>
);
