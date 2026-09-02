import type { CollectionEntry } from "astro:content";
import { Helmet } from "react-helmet";
import List from "~/components/common/list.jsx";
import Heading from "~/components/common/heading.jsx";
import Link from "~/components/common/link.jsx";
import type { PropsWithChildren } from "react";

export const RecipeCards = ({ children }) => (
  <RecipeSection>
    <Helmet>
      <meta
        property="description"
        content="We like to cook. We particularly like to cook these recipes. Hopefully you find these of mutual interest."
      />
    </Helmet>
    {children}
  </RecipeSection>
);

const RecipeSection = ({ children }) => (
  <div className="py-0 md:py-2 lg:py-8 px-4 sm:px-6 lg:px-8">
    <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <Heading
          as="h2"
          classAdd="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl"
        >
          Recipes
        </Heading>
      </div>
      <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const RecipeWrap = ({
  children,
  recipe,
}: PropsWithChildren<{
  recipe: CollectionEntry<"recipes">;
}>) => (
  <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <Link href={`/${recipe.id}`} flair="none">
      <div className="shrink-0">{children}</div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <Heading as="h3">{recipe.data.title}</Heading>
          <List as="ul">
            {recipe.data.ingredients.map((ing) => (
              <List key={ing.name}>
                {ing.quantity && `${ing.quantity}${ing.units ? ` ${ing.units}` : ""} `}
                {ing.name}
              </List>
            ))}
          </List>
        </div>
      </div>
    </Link>
  </div>
);
