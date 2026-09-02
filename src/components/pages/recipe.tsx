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
      <div className="relative text-base mx-auto max-w-lg:max-w-none">
        <figure>
          <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
            {children}
          </div>
        </figure>
      </div>
    </div>
    <div className="mt-8 lg:mt-0">
      <div className="mt-5 text-primary-900 dark:text-primary-50 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
        <Heading as="h3" classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          Ingredients
        </Heading>
        <List as="ul">
          {recipe.data.ingredients.map((ing) => (
            <List key={ing.name}>
              {ing.quantity && `${ing.quantity}${ing.units ? ` ${ing.units}` : ""} `}
              {ing.name}
            </List>
          ))}
        </List>
        <Heading as="h3" classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          Directions
        </Heading>
        <div className="space-y-6">
          {recipe.data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.name && (
                <Heading as="h4" classAdd="px-2">
                  {section.name}
                </Heading>
              )}
              <div className="space-y-4">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="prose prose-sm max-w-none">
                    {step.map((item, itemIndex) => {
                      const key = `${sectionIndex}-${stepIndex}-${itemIndex}`;
                      if (item.type === "text") {
                        return <span key={key}>{item.value}</span>;
                      } else if (item.type === "ingredient") {
                        return (
                          <strong key={key}>
                            {item.name}
                            {item.quantity && ` (${item.quantity}${item.units ? ` ${item.units}` : ""})`}
                          </strong>
                        );
                      } else if (item.type === "cookware") {
                        return (
                          <em key={key}>{item.name}</em>
                        );
                      } else if (item.type === "timer") {
                        return (
                          <span key={key}>
                            {item.quantity && `${item.quantity}${item.units ? ` ${item.units}` : ""}`}
                            {item.name && ` (${item.name})`}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {recipe.data.source && (
      <div className="mt-8 lg:mt-0">
        <div className="mt-5 text-primary-900 dark:text-primary-50 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
          <div className="px-2">
            <Heading as="h3">Source</Heading>
            <span>{recipe.data.source}</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export const RecipeChrome = ({
  recipe,
  children,
}: PropsWithChildren<{ recipe: CollectionEntry<"recipes"> }>) => (
  <div className="overflow-hidden">
    <Helmet>
      <title>Jacob Bolda | {recipe.data.title}</title>
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="relative max-w-7xl mx-auto py-0 md:py-2 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:block absolute top-0 bottom-0 left-3/4 w-screen" />
      <div className="mx-auto text-base max-w-lg:max-w-none">
        <Heading as="h1">{recipe.data.title}</Heading>
      </div>
      {children}
    </div>
  </div>
);
