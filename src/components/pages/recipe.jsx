import { Helmet } from "react-helmet";
import Heading from "~/components/common/heading.jsx";
import Link from "~/components/common/link.jsx";

export default ({ recipe, image, children }) => (
  <RecipeChrome recipe={recipe}>
    <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
      <div className="relative lg:row-start-1 lg:col-start-2">
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
        {!recipe.image ? null : (
          <div className="relative text-base mx-auto max-w-lg:max-w-none">
            <figure>
              <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                {image}
              </div>
            </figure>
          </div>
        )}
      </div>
      <div className="mt-8 lg:mt-0">
        <div className="mt-5 text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
          {children}
          <div className="px-2">
            <Heading as="h3">Inspiration</Heading>
            <Link href={recipe.inspiration}>{recipe.inspiration}</Link>
          </div>
        </div>
      </div>
    </div>
  </RecipeChrome>
);

const RecipeChrome = ({ recipe, children }) => (
  <div className="overflow-hidden">
    <Helmet>
      <title>Jacob Bolda | {recipe.name}</title>
      <meta property="og:type" content="website" />
    </Helmet>
    <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:block absolute top-0 bottom-0 left-3/4 w-screen" />
      <div className="mx-auto text-base max-w-lg:max-w-none">
        {!recipe["last made"] ? null : (
          <Heading as="h3" className="text-primary-300 dark:text-primary-600">
            {"Last Made: "}
            <time dateTime={recipe["last made"].toISOString()}>
              {recipe["last made"].toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </Heading>
        )}
        <Heading as="h1">{recipe.name}</Heading>
      </div>
      {children}
    </div>
  </div>
);
