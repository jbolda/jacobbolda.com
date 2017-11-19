import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import moment from "moment"

import MasterLayout from "./master"

class BlogPostLayout extends React.Component {
  render() {
    let siteMetadata = this.props.data.site.siteMetadata

    return (
      <MasterLayout {...this.props}>
        <div className="section">
          {this.props.children()}
        </div>
        <div className="section">
          <hr />
          <div className="container">
            <p>
              {siteMetadata.siteDescr}
              <a href={siteMetadata.siteTwitterUrl}>
                <br /> <strong>{siteMetadata.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </MasterLayout>
    )
  }
}

export default BlogPostLayout

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
