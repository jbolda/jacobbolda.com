import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import sortBy from "lodash/sortBy"
import HeroLayout from '../../plugins/gatsby-theme-bulma-homepage/Hero/HeroLayout'

class SiteIndex extends React.Component {
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
          pageArray.push(page.node.frontmatter)
        }
      } else if (typeof page.node.data === `object`) {
        if (
          typeof page.node.data.written != `undefined` &&
          page.node.data.written != ``
        ) {
          pageArray.push(page.node.data)
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
                    <h5 className="tag is-secondary is-6 level-right">
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
        <h1 className="title">Articles</h1>
        <h2 className="subtitle">Sometimes I write, the most recent</h2>
        <hr/>
        <div className="columns is-multiline">
          {pageLinks}
        </div>
      </HeroLayout>
    )
  }
}

export default SiteIndex

export const pageQuery = graphql`
  query allPosts {
    allJsFrontmatter(filter: {data: {layoutType: {eq: "post"}}}) {
      edges {
        node {
          fileAbsolutePath
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
        sizes(maxWidth: 500, maxHeight:500, quality: 90) {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
  }
`
