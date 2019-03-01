import React from "react";
import { Link } from "gatsby";
import SimpleNav from "gatsby-theme-bulma-layout/src/Simple/SimpleNav";
import HeroLanding from "gatsby-theme-bulma-homepage/src/Hero/components/HeroLanding";
import HeroAbout from "gatsby-theme-bulma-homepage/src/Hero/components/HeroAbout";
import ProfessionalEngagements from "../../../components/professionalEngagements";
import HeroArticles from "gatsby-theme-bulma-homepage/src/Hero/components/HeroArticles";
import RecipeList from "../../../components/recipeList";

export const frontmatter = { path: "/" };

const SiteIndex = props => (
  <SimpleNav location={props.location}>
    <HeroLanding textColor=' ' />
    <HeroAbout />
    <section className="section is-fourthary edge--top">
      <h1 className="title">Professional Engagements</h1>
      <h2 className="subtitle">In View of the Public</h2>
      <hr />
      <div className="columns is-multiline">
        <ProfessionalEngagements />
      </div>
    </section>
    <HeroArticles swatch='secondary' edge='edge--top--reverse' />
    {props.children}
    <section className="section is-fourthary edge--top">
      <h1 className="title">
        <Link to="/recipes/">Recipes</Link>
      </h1>
      <h2 className="subtitle">
        We enjoy cooking. These are a few of our favorites eaten recently.
      </h2>
      <hr />
      <div className="columns is-multiline">
        <RecipeList />
      </div>
    </section>
  </SimpleNav>
);

export default SiteIndex;
