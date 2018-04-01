import React from "react"
import InsetLayout from '../../plugins/gatsby-theme-bulma-homepage/Inset/InsetLayout'

class mdInsetPage extends React.Component {
  render() {
    const {html} = this.props.data.markdownRemark

    return (
      <InsetLayout {...this.props}>
        <div className="box content">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </InsetLayout>
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
