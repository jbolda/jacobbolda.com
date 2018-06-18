import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import sortBy from "lodash/sortBy"
import HeroLayout from '../../plugins/gatsby-theme-bulma-homepage/Hero/HeroLayout'
import Img from 'gatsby-image'

class SiteIndex extends React.Component {
  findPhoto(slug) {
    let retPhoto
    this.props.data.allHero.edges.forEach(edge => {
      if (slug === `/${edge.node.relativeDirectory}/`) {
        retPhoto = <Img className="image" Tag="figure" sizes={edge.node.childImageSharp.sizes} />
      }
    })
    return retPhoto
  }

  render() {
    const {siteMetadata} = this.props.data.site
    const pageLinks = []
    let iteratorKey = 0
    let pageRaw = [
      ...this.props.data.allMarkdownRemark.edges,
      ...this.props.data.allJsFrontmatter.edges,
    ]
    let pageArray = []

    pageRaw.forEach(page => {
      if (typeof page.node.frontmatter === `object`) {
        if (typeof page.node.frontmatter.written != `undefined`) {
          pageArray.push({...page.node.frontmatter, ...page.node.fields})
        }
      } else if (typeof page.node.data === `object`) {
        if (
          typeof page.node.data.written != `undefined` &&
          page.node.data.written != ``
        ) {
          pageArray.push({...page.node.data, ...page.node.fields})
        }
      } else {
        let restrNode = {...page.node, ...page.node.description}
        pageArray.push(restrNode)
      }
    })

    const sortedPages = sortBy(
      pageArray,
      page => page.updated || page.written
    ).reverse()
    sortedPages.forEach(page => {
      let frontmatter = page

      if (frontmatter.layoutType == `post`) {
        iteratorKey += 1
        pageLinks.push(
          <div className="column is-one-third" key={iteratorKey}>
            <div className="card">
              <div className="card-image">
                {this.findPhoto(page.slug)}
              </div>
              <div className="card-content">
                <div className="heading">
                  <div className="level">
                    <h4 className="level-left">
                      <time
                        className="subtitle is-6"
                        dateTime={frontmatter.updatedPretty || frontmatter.writtenPretty}
                      >
                        {frontmatter.updatedPretty || frontmatter.writtenPretty}
                      </time>
                    </h4>
                    <h5 className="tag is-thirdary is-6 level-right">
                      {frontmatter.category}
                    </h5>
                  </div>
                  <h1 className="title">
                    <Link to={frontmatter.path}>
                      {frontmatter.title}
                    </Link>
                  </h1>
                </div>
                <div className="content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: frontmatter.description,
                    }}
                  />
                </div>
                <nav className="level">
                  <div className="level-left">
                    <span className="level-item">
                      <Link to={frontmatter.path}>Read</Link>
                    </span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )
      }
    })

    return (
      <HeroLayout {...this.props}>
        <Helmet
          title={siteMetadata.siteTitle}
          meta={[
            { name: `description`, content: siteMetadata.siteDescr },
            { name: `keywords`, content: `articles` },
          ]}
        />
        <section className="section is-fourthary edge--top">
          <h1 className="title">Professional Engagements</h1>
          <h2 className="subtitle">In View of the Public</h2>
          <hr/>
          <div className="columns is-multiline">
            {professionalEngagements()}
          </div>
        </section>
        <section className="section is-fifthary edge--top--reverse">
          <h1 className="title">Articles</h1>
          <h2 className="subtitle">Sometimes I write, the most recent</h2>
          <hr/>
          <div className="columns is-multiline">
            {pageLinks}
          </div>
        </section>
        <section className="section is-fourthary edge--top">
            <h1 className="title">
              <Link to="/recipes/">
                Recipes
              </Link>
            </h1>
            <h2 className="subtitle">We enjoy cooking. These are a few of our favorites eaten recently.</h2>
            <hr/>
            <div className="columns is-multiline">
              {recipeList(this.props.data.allAirtableLinked.edges)}
            </div>
        </section>
      </HeroLayout>
    )
  }
}

export default SiteIndex

const professionalEngagements = () =>
  <div className="tile is-ancestor">
    <div className="tile is-vertical is-8">
      <div className="tile">
        <div className="tile is-parent is-vertical">
          <ChildTile Child={PodcastTile} />
          <ChildTile Child={PodcastTile} />
        </div>
        <div className="tile is-parent">
          <ChildTile Child={MitchellLofts} />
        </div>
      </div>
      <div className="tile is-parent">
        <ChildTile Child={PodcastTile} />
      </div>
    </div>
    <div className="tile is-parent">
      <ChildTile Child={PodcastTile} />
    </div>
  </div>

const ChildTile = ({props, Child}) =>
  <article className="tile is-child notification is-thirdary">
    <Child />
  </article>

const PodcastTile = props =>
  <div>
    <TileTitle
      text="STEM on Fire Guest"
      url="https://stemonfire.com/43-architectural-and-structural-engineer-jacob-bolda/"
      />
    <TileSub text="Guest #43 Representing the AEC Industry" />
    <p>
      The podcast hosts practicing professionals, college professors and college students.
      {' '}The focus will be to provide insights into STEM professions, what is required to get
      {' '}through the curriculum and additional strategies to guide you towards a successful career.
    </p>
  </div>

const MitchellLofts = props =>
  <div>
    <TileTitle
      text="Mitchell Street Market Lofts"
      url="http://www.impactseven.org/portfolio-items/mitchell-street-market-lofts/"
      />
    <TileSub text="new construction affordable housing development" />
    <figure className="image is-4by3">
      <img src="http://www.impactseven.org/wp-content/uploads/2015/11/WEB-35-320x202.jpg" />
    </figure>
    <p>
      Located in the Muskego Way neighborhood and built on what was once a city-owned vacant brownfield lot,
      {' '}Mitchell Street Market Lofts is a new construction affordable housing development. I created the
      {' '}original design of these lofts during Senior Design. We pitched the design to the eventual developers.
      {' '}After a few small tweaks, we passed off the preliminary design to the Architects and it lead to
      {' '}what you can see now.
    </p>
  </div>

const TileTitle = ({text, url}) =>
  <p className="title is-4">
    {url ? <TileLink url={url} text={text} /> : text}
  </p>

const TileLink = ({url, text}) =>
  <a href={url} target="_blank">{text}</a>

const TileSub = ({text}) =>
  <p className="subtitle">
    {children}
  </p>

const recipeList = recipes => recipes.map(recipe => 
  <div className="column is-one-third" key={recipe.node.id}>
    <div className="card">
      {recipe.node.data.Attachments ?
      <div className="card-image">
        <figure className="image">
          <img src={recipe.node.data.Attachments[0].thumbnails.large.url} style={{objectFit: "cover", height: "200px"}}/>
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
        <Link to={recipe.node.fields.slug}>
          <h2 className="title has-text-centered">{recipe.node.data.Name}</h2>
        </Link>
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
      </div>
      {recipe.node.data.URL ? 
      <footer className="card-footer">
        <a href={recipe.node.data.URL} className="card-footer-item" target="_blank">Recipe Link</a>
      </footer>
      : null}
    </div>
  </div>
)

export const pageQuery = graphql`
  query allPosts {
    allJsFrontmatter(filter: {data: {layoutType: {eq: "post"}}}) {
      edges {
        node {
          fields {
            slug
          }
          data {
            path
            title
            written
            writtenPretty: written(formatString: "MMMM D, YYYY")
            updated
            updatePretty: updated(formatString: "MMMM D, YYYY")
            layoutType
            category
            description
          }
        }
      }
    }
    allMarkdownRemark(filter: {frontmatter: {layoutType: {eq: "post"}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            path
            layoutType
            parent
            written
            writtenPretty: written(formatString: "MMMM D, YYYY")
            updated
            updatePretty: updated(formatString: "MMMM D, YYYY")
            category
            description
          }
          timeToRead
        }
      }
    }
    allAirtableLinked(filter: {table: {eq: "Recipes"}, data: {Last_Made: {ne: null}}}, sort: {fields: [data___Last_Made], order: DESC}, limit: 3) {
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
              thumbnails {
                large {
                  url
                  width
                  height
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
        siteKeybaseUrl
        siteKeybasePretty
        siteAngelListUrl
        siteAngelListPretty
        sitePhotoUrl
        sitePhotoPretty
      }
    }
    file(relativePath: {eq: "assets/profile.png"}) {
      childImageSharp {
        sizes(
          maxWidth: 500,
          maxHeight:500,
          quality: 90,
          duotone: {
            highlight: "#bdc4bf",
            shadow: "#192C3B"
          }) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    allHero: allFile(filter: {sourceInstanceName: {eq: "articles"}, name: {eq: "hero"}}) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            sizes(maxWidth: 500, maxHeight:200, quality: 90) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
    }
    about: file(relativePath: {eq: "_about.md"}) {
      childMarkdownRemark {
        html
      }
    }
    placeholder: file(relativePath: {eq: "images/placeholder.png"}) {
      publicURL
    }
  }
`


let checkBlank = (value) => value ? value : `--`
let checkBlankTime = (value) => value ? `${value}m` : `--`
