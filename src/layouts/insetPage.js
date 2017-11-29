import React from "react"
import SiteSidebar from "../components/SiteSidebar"
import MasterLayout from "./master"


class InsetPageLayout extends React.Component {
  render() {
    const siteMetadata = this.props.data.site

    return (
      <MasterLayout {...this.props}>
        <div className="PageTemplate section container is-primary">
          <div className="columns">
            <div className="column is-one-quarter">
              <SiteSidebar {...this.props} />
            </div>
            <div className="column">
              {this.props.children()}
            </div>
          </div>
        </div>
      </MasterLayout>
    )
  }
}

export default InsetPageLayout

export const pageQuery = graphql`
query InsetLayoutBySlug {
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
