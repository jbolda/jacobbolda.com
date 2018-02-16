import React from "react"
import Link from "gatsby-link"
import SimpleNav from "gatsby-theme-bulma-layout"

class SimpleBlogPostLayout extends React.Component {
  render() {
    let siteMetadata = this.props.siteMetadata

    return (
      <SimpleNav siteMetadata={...siteMetadata}>
        {this.props.children}
        <section className="section">
          <hr />
          <div className="container">
            <p>
              {siteMetadata.siteDescr}
              <a href={siteMetadata.siteTwitterUrl}>
                <br /> <strong>{siteMetadata.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </section>
      </SimpleNav>
    )
  }
}

export default SimpleBlogPostLayout

// TODO, this needs to become a fragment
export const pageQuery = graphql`
query BlogPostLayoutBySlug {
  site {
    siteMetadata {
      siteTitle
      siteDescr
      siteAuthor
      siteEmailUrl
      siteEmailPretty
      siteTwitterUrl
      siteTwitterPretty
    }
  }
}
`
