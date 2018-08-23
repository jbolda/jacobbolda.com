import React from "react";
import { Link, graphql } from "gatsby";
import SimpleNavBridge from "../utils/SimpleNavBridge";
import Img from "gatsby-image";

export const frontmatter = {
  title: "Recipes",
  layoutType: "page",
  path: "/recipes/"
};

class SimpleRecipes extends React.Component {
  render() {
    let recipes = this.props.data.allAirtableLinked.edges;

    return (
      <SimpleNavBridge {...this.props}>
        <div className="hero is-small is-thirdary edge--bottom--reverse">
          <div className="hero-body">
            <div className="columns is-centered is-vcentered">
              <div className="column is-one-third content">
                <p className="title">Our Recipes</p>
                <p>
                  We enjoy cooking (and certainly do our best to do it in a
                  healthy manner). These are the "approved" recipes that we love
                  and plan to eat multiple times. They are actually stored on{" "}
                  <a
                    href="https://www.airtable.com/?ref=www.jacobbolda.com"
                    target="_blank"
                  >
                    Airtable.com
                  </a>{" "}
                  and pulled into the website using a{" "}
                  <Link to="/gatsby-and-contributing-to-open-source/">
                    Gatsbyjs plugin
                  </Link>{" "}
                  that I wrote. You can see the Airtable (and copy it for
                  yourself) at{" "}
                  <a href="http://recipes.amyandjacob.com" target="_blank">
                    recipes.amyandjacob.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="columns is-multiline">
            {recipes.map(recipe => (
              <div className="column is-one-third" key={recipe.node.id}>
                <div className="card">
                  {recipe.node.data.Attachments &&
                  recipe.node.data.Attachments.localFiles != 0 ? (
                    <div className="card-image">
                      <figure className="image">
                        <Img
                          fluid={
                            recipe.node.data.Attachments.localFiles[0]
                              .childImageSharp.fluid
                          }
                        />
                      </figure>
                    </div>
                  ) : (
                    <div className="card-image">
                      <figure className="image is-3by2">
                        <img src={this.props.data.placeholder.publicURL} />
                      </figure>
                    </div>
                  )}
                  <div className="card-content">
                    <Link to={recipe.node.fields.slug}>
                      <h2 className="title has-text-centered">
                        {recipe.node.data.Name}
                      </h2>
                    </Link>
                    <div className="level">
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">Rating</p>
                          <p className="">
                            {checkBlank(recipe.node.data.Rating)}
                            {`\u2606`}/10
                          </p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                          <p className="heading">Last Made</p>
                          <p className="">
                            {checkBlank(recipe.node.data.Last_Made)}
                          </p>
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
                    <div className="content">
                      <ul>
                        {recipe.node.data.Ingredients.split(`\n`).map(
                          (ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          )
                        )}
                      </ul>
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
            ))}
          </div>
        </div>
      </SimpleNavBridge>
    );
  }
}

export default SimpleRecipes;

export const pageQuery = graphql`
  query SimpleRecipes {
    allAirtableLinked(filter: { table: { eq: "Recipes" } }) {
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
                  fluid(maxWidth: 256) {
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
    site {
      siteMetadata {
        siteTitle
        siteDescription
        siteAuthor
        siteEmailUrl
        siteEmailPretty
        siteTwitterUrl
        siteTwitterPretty
        siteLinkedInUrl
        siteLinkedInPretty
        siteGithubUrl
        siteGithubPretty
        siteAngelListUrl
        siteAngelListPretty
        siteKeybaseUrl
        siteKeybasePretty
        sitePhotoUrl
        sitePhotoPretty
      }
    }
    file(relativePath: { eq: "assets/profile.png" }) {
      childImageSharp {
        fluid(maxWidth: 256) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    placeholder: file(relativePath: { eq: "images/placeholder.png" }) {
      publicURL
    }
  }
`;

let checkBlank = value => (value ? value : `--`);
let checkBlankTime = value => (value ? `${value}m` : `--`);
