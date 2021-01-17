/* @jsx h */
import { h } from "preact";
import Heading from "./../src/components/heading.js";
import List from "./../src/components/list.js";

export default ({ recipe }) => (
  <div class="bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
      <div class="mx-auto text-base max-w-lg:max-w-none">
        <h3 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">{`Last Made: ${recipe["last made"]}`}</h3>
        <h2 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {recipe.name}
        </h2>
      </div>
      <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="relative lg:row-start-1 lg:col-start-2">
          <svg
            class="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
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
                  class="text-gray-200"
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
          <div class="relative text-base mx-auto max-w-lg:max-w-none">
            <figure>
              <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
                <img
                  class="rounded-lg shadow-lg object-cover object-center"
                  src={recipe.images[0].url}
                  alt={`Image of ${recipe.name}`}
                />
              </div>
            </figure>
          </div>
        </div>
        <div class="mt-8 lg:mt-0">
          <div class="mt-5 text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
            <Heading as="h3">Ingredients</Heading>
            <List
              as="ul"
              dangerouslySetInnerHTML={{ __html: recipe.ingredientsHTML }}
            />
            <Heading as="h3">Directions</Heading>
            <List
              as="ol"
              dangerouslySetInnerHTML={{ __html: recipe.directionsHTML }}
            />

            <Heading as="h4">Inspiration</Heading>
            <a href={recipe.inspiration}>{recipe.inspiration}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
