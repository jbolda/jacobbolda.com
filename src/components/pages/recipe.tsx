import type { CollectionEntry } from "astro:content";
import type { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import Heading from "~/components/common/heading.jsx";
import Link from "~/components/common/link.jsx";
import List from "../common/list";
import styles from "./recipe.module.css";

export const RecipeEntry = ({
  recipe,
  children,
}: PropsWithChildren<{
  recipe: CollectionEntry<"recipes">;
}>) => (
  <div className={styles.recipeEntry}>
    <div id="recipe-image" className={styles.recipeImageCol}>
      <svg
        className={styles.decorativeSvg}
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
              className={styles.decorativeGridDot}
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
      <div className={styles.recipeImageInner}>
        <figure>
          <div>{children}</div>
        </figure>
      </div>
    </div>
    <div className={styles.recipeInfoCol}>
      <div className={styles.recipeInfoInner}>
        <Heading as="h3" className={styles.mdxContent}>
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
        <Heading as="h3" className={styles.mdxContent}>
          Directions
        </Heading>
        <div className={styles.recipeDirections}>
          {recipe.data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.recipeSection}>
              {section.name && (
                <Heading as="h4" className={styles.mdxContent}>
                  {section.name}
                </Heading>
              )}
              <div className={styles.recipeSteps}>
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className={styles.recipeStep}>
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
                        return <em key={key}>{item.name}</em>;
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
      <div className={styles.recipeSourceCol}>
        <div className={styles.recipeSourceInner}>
          <div className={styles.sourceContent}>
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
  <div className={styles.recipeChrome}>
    <Helmet>
      <title>Jacob Bolda | {recipe.data.title}</title>
      <meta property="og:type" content="website" />
    </Helmet>
    <div className={styles.recipeChromeInner}>
      <div className={styles.recipeChromeDesktopLine} />
      <div className={styles.recipeChromeTitle}>
        <Heading as="h1">{recipe.data.title}</Heading>
      </div>
      {children}
    </div>
  </div>
);
