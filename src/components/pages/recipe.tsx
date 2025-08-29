import type { CollectionEntry } from "astro:content";
import type { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import Heading from "~/components/common/heading.jsx";
import Link from "~/components/common/link.jsx";
import List from "../common/list";

export const RecipeEntry = ({
  recipe,
  children,
}: PropsWithChildren<{
  recipe: CollectionEntry<"recipes">;
}>) => (
  <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
    <div id="recipe-image" className="relative lg:row-start-1 lg:col-start-2">
      <svg
        className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="de316486-4a29-4312-bdfc-fbce2132a2c1"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width={404}
          height={384}
          fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
        />
      </svg>
      {!recipe.data.images ? null : (
        <div className="relative text-base mx-auto max-w-lg:max-w-none">
          <figure>
            <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
              {children}
            </div>
          </figure>
        </div>
      )}
    </div>
    <div className="mt-8 lg:mt-0">
      <div className="mt-5 text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <Heading as="h3" classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          Ingredients
        </Heading>
        <List as="ul">
          {recipe.data.ingredients.split("\n").map((line) => (
            <List key={line}>{line.slice(2)}</List>
          ))}
        </List>
        <Heading as="h3" classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          Directions
        </Heading>
        <List as="ol">
          {recipe.data.directions
            .split("\n")
            .filter(Boolean)
            .map((step, index) => (
              <List key={index}>{step.slice(3)}</List>
            ))}
        </List>{" "}
      </div>
    </div>
    <div className="mt-8 lg:mt-0">
      <div className="mt-5 text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <div className="px-2">
          <Heading as="h3">Inspiration</Heading>
          <Link href={recipe.data.inspiration}>{recipe.data.inspiration}</Link>
        </div>
      </div>
    </div>
  </div>
);

export const RecipeChrome = ({
  recipe,
  children,
}: PropsWithChildren<{ recipe: CollectionEntry<"recipes"> }>) => (
  <div className="overflow-hidden">
    <Helmet>
      <title>Jacob Bolda | {recipe.data.name}</title>
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:block absolute top-0 bottom-0 left-3/4 w-screen" />
      <div className="mx-auto text-base max-w-lg:max-w-none">
        {!recipe?.data?.["last made"] ? null : (
          <Heading as="h3" classAdd="text-primary-300 dark:text-primary-600">
            {"Last Made: "}
            <time dateTime={recipe.data["last made"].toISOString()}>
              {recipe.data["last made"].toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </Heading>
        )}
        <Heading as="h1">{recipe.data.name}</Heading>
      </div>
      {children}
    </div>
  </div>
);
