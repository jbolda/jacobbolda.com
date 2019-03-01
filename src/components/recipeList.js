import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const RecipeList = () => {
  const { recipes } = useStaticQuery(
    graphql`
      query RecipeList {
        recipes: allAirtable(
          filter: {
            table: { eq: "Recipes" }
            data: { Last_Made: { ne: null } }
          }
          sort: { fields: [data___Last_Made], order: DESC }
          limit: 3
        ) {
          edges {
            node {
              id
              data {
                Name
                Directions
                URL
                Cooking_Time
                Preparation_Time
                Total_Time
                Last_Made
                Rating
                Ingredients
                Attachments {
                  localFiles {
                    childImageSharp {
                      fluid(
                        maxWidth: 600
                        maxHeight: 480
                        quality: 100
                        cropFocus: ENTROPY
                      ) {
                        ...GatsbyImageSharpFluid_tracedSVG
                      }
                    }
                  }
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  return recipeList(recipes.edges);
};

export default RecipeList;

const recipeList = recipes =>
  recipes.map(recipe => (
    <div className="column is-one-third" key={recipe.node.id}>
      <div className="card">
        {recipe.node.data.Attachments &&
        recipe.node.data.Attachments.localFiles != 0 ? (
          <div className="card-image">
            <figure className="image">
              <Img
                fluid={
                  recipe.node.data.Attachments.localFiles[0].childImageSharp
                    .fluid
                }
              />
            </figure>
          </div>
        ) : (
          <div className="card-image">
            <figure className="image is-5by4">
              <img src={this.props.data.placeholder.publicURL} />
            </figure>
          </div>
        )}
        <div className="card-content">
          <Link to={recipe.node.fields.slug}>
            <h2 className="title has-text-centered">{recipe.node.data.Name}</h2>
          </Link>
          <div className="level is-mobile">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Rating</p>
                <p className="">
                  {checkBlank(recipe.node.data.Rating)}
                  {`\u2606`}
                  /10
                </p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Last Made</p>
                <p className="">{checkBlank(recipe.node.data.Last_Made)}</p>
              </div>
            </div>
          </div>
          <div className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Prep Time</p>
                <p className="">{`Prep: ${checkBlankTime(
                  recipe.node.data.Preparation_Time
                )}`}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Cook Time</p>
                <p className="">{`Cooking: ${checkBlankTime(
                  recipe.node.data.Cooking_Time
                )}`}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Total Time</p>
                <p className="">{`Total: ${checkBlankTime(
                  recipe.node.data.Total_Time
                )}`}</p>
              </div>
            </div>
          </div>
        </div>
        {recipe.node.data.URL ? (
          <footer className="card-footer">
            <a
              href={recipe.node.data.URL}
              className="card-footer-item"
              target="_blank"
            >
              Recipe Link
            </a>
          </footer>
        ) : null}
      </div>
    </div>
  ));

const checkBlank = value => (value ? value : `--`);
const checkBlankTime = value => (value ? `${value}m` : `--`);
