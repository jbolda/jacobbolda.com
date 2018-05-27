import React from "react"
import SimpleNav from '../../plugins/gatsby-theme-bulma-layout/Simple/SimpleNav'

class SimpleRecipe extends React.Component {
  render() {
    console.log(this)
    let recipe = this.props.data.airtableLinked

    return (
      <SimpleNav  sitemetadata={this.props.data.site.siteMetadata} location={this.props.location}>
        <div className="section">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                {recipe.data.Attachments ?
                <div className="card-image">
                  <figure className="image">
                    <img src={recipe.data.Attachments[0].thumbnails.large.url} />
                  </figure>
                </div>
                : 
                <div className="card-image">
                  <figure className="image is-3by2">
                    <img src={this.props.data.placeholder.publicURL} />
                  </figure>
                </div>
                }
                <div className="card-content">
                  <h2 className="title has-text-centered">{recipe.data.Name}</h2>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                      <p className="heading">Rating</p>
                      <p className="">{checkBlank(recipe.data.Rating)}{`\u2606`}/10</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                      <p className="heading">Last Made</p>
                      <p className="">{checkBlank(recipe.data.Last_Made)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                      <p className="heading">Prep Time</p>
                      <p className="">{`Prep: ${checkBlankTime(recipe.data.Preparation_Time)}`}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                      <p className="heading">Cook Time</p>
                      <p className="">{`Cooking: ${checkBlankTime(recipe.data.Cooking_Time)}`}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                      <p className="heading">Total Time</p>
                      <p className="">{`Total: ${checkBlankTime(recipe.data.Total_Time)}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h2 className="title">Ingredients</h2>
                    <p>
                      <ul>{recipe.data.Ingredients.split(`\n`).map(
                      ingredient => <li>{ingredient}</li>
                      )}</ul>
                    </p>
                    <h2 className="title">Directions</h2>
                    {recipe.data.Directions.split(`\n`).map(
                    direction => <p>{direction}</p>
                    )}
                  </div>
                </div>
                {recipe.data.URL ? 
                <footer className="card-footer">
                  <a href={recipe.data.URL} className="card-footer-item" target="_blank">Recipe Link</a>
                </footer>
                : null}
              </div>
            </div>
          </div>
        </div>
      </SimpleNav>
    )
  }
}

export default SimpleRecipe

export const pageQuery = graphql`
  query SimpleRecipeBySlug($name: String!) {
    airtableLinked(table: {eq: "Recipes"}, data: {Name: {eq: $name}}) {
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
          thumbnails {
            large {
              url
              width
              height
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteTitle
        siteDescr
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
    file(relativePath: {eq: "assets/profile.png"}) {
      childImageSharp {
        sizes(maxWidth: 256) {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
    placeholder: file(relativePath: {eq: "images/placeholder.png"}) {
      publicURL
    }
  }
`

let checkBlank = (value) => value ? value : `--`
let checkBlankTime = (value) => value ? `${value}m` : `--`
