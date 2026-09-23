import type { CollectionEntry } from "astro:content";
import { Helmet } from "react-helmet";
import List from "~/components/common/list.jsx";
import Heading from "~/components/common/heading.jsx";
import Link from "~/components/common/link.jsx";
import styles from "./recipes.module.css";
import sectionStyles from "~/styles/content-section.module.css";
import unstyledLinkStyles from "~/styles/unstyled-link.module.css";
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
  <div className={sectionStyles.section}>
    <div className={sectionStyles.inner}>
      <div>
        <Heading as="h2" className={sectionStyles.title}>
          Recipes
        </Heading>
      </div>
      <div className={sectionStyles.grid}>{children}</div>
    </div>
  </div>
);

export const RecipeWrap = ({
  children,
  recipe,
}: PropsWithChildren<{
  recipe: CollectionEntry<"recipes">;
}>) => (
  <div className={styles.recipeCard}>
    <Link href={`/${recipe.id}`} className={unstyledLinkStyles.link}>
      <div className={styles.recipeImageWrap}>{children}</div>
      <div className={styles.recipeContent}>
        <div className={styles.recipeContentInner}>
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
