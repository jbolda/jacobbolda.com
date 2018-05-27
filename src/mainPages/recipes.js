import React from "react"
import SimpleNav from '../../plugins/gatsby-theme-bulma-layout/Simple/SimpleNav'

exports.data = {
  title: 'Recipes',
  layoutType: 'page',
  path: '/recipes/'
}

class SimpleRecipes extends React.Component {
  render() {
    console.log(this)
    let recipes = this.props.data.allAirtableLinked.edges

    return (
      <SimpleNav  sitemetadata={this.props.data.site.siteMetadata} location={this.props.location}>
        <div className="section">
          <div className="columns is-multiline">
            {recipes.map(recipe =>
              <div className="column is-one-third" key={recipe.node.id}>
                <div className="card">
                  {recipe.node.data.Attachments ?
                  <div className="card-image">
                    <figure className="image">
                      <img src={recipe.node.data.Attachments[0].thumbnails.large.url} />
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
                    <h2 className="title has-text-centered">{recipe.node.data.Name}</h2>
                    <div className="level">
                      <div className="level-item has-text-centered">
                        <div>
                        <p className="heading">Rating</p>
                        <p className="">{checkBlank(recipe.node.data.Rating)}{`\u2606`}/10</p>
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
                        <p className="">{`Prep: ${checkBlankTime(recipe.node.data.Preparation_Time)}`}</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                        <p className="heading">Cook Time</p>
                        <p className="">{`Cooking: ${checkBlankTime(recipe.node.data.Cooking_Time)}`}</p>
                        </div>
                      </div>
                      <div className="level-item has-text-centered">
                        <div>
                        <p className="heading">Total Time</p>
                        <p className="">{`Total: ${checkBlankTime(recipe.node.data.Total_Time)}`}</p>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <p>
                        <ul>{recipe.node.data.Ingredients.split(`\n`).map(
                        ingredient => <li>{ingredient}</li>
                        )}</ul>
                      </p>
                    </div>
                  </div>
                  {recipe.node.data.URL ? 
                  <footer className="card-footer">
                    <a href={recipe.node.data.URL} className="card-footer-item" target="_blank">Recipe Link</a>
                  </footer>
                  : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </SimpleNav>
    )
  }
}

export default SimpleRecipes

export const pageQuery = graphql`
  query SimpleRecipes {
    allAirtableLinked(filter: {table: {eq: "Recipes"}}) {
      edges {
        node {
          id
          data {
            Name
            Directions
            URL
            Cook_Prep_Total_Time
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
