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
              <div className="column is-half" key={recipe.node.id}>
                <div className="card">
                  {recipe.node.data.Attachments ?
                  <div className="card-image">
                    <figure className="image">
                      <img src={recipe.node.data.Attachments[0].thumbnails.large.url} height={recipe.node.data.Attachments[0].thumbnails.large.height} />
                    </figure>
                  </div>
                   : ""}
                  <div className="card-content">
                    <h2 className="title">{recipe.node.data.Name}</h2>
                    <div className="content">
                      <p>{recipe.node.data.Ingredients}</p>
                      <p>{recipe.node.data.Directions}</p>
                    </div>
                  </div>
                  {recipe.node.data.URL ? 
                  <footer className="card-footer">
                    <a href={recipe.node.data.URL} className="card-footer-item" target="_blank">Recipe Link</a>
                  </footer>
                  : ""}
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
  }
`
