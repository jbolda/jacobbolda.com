import React from "react"
import SimpleNav from '../../plugins/gatsby-theme-bulma-layout/Simple/SimpleNav'

class mdInsetPage extends React.Component {
  render() {
    const {html} = this.props.data.markdownRemark

    return (
      <SimpleNav  sitemetadata={this.props.data.site.siteMetadata} location={this.props.location}>
        <div className="box content">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </SimpleNav>
    )
  }
}

export default mdInsetPage

export const pageQuery = graphql`
  query markdownTemplateBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
