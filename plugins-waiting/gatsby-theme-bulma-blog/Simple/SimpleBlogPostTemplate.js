import React from "react"
import moment from "moment"
import SimpleChrome from "./SimpleChrome"

class SimpleBlogPostTemplate extends React.Component {
  render() {
    const {html, frontmatter} = this.props.data.post

    return (
      <SimpleChrome {...this.props.data}>
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </SimpleChrome>
    )
  }
}

export default SimpleBlogPostTemplate

export const pageQuery = graphql`
  query mdBlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      ...MarkdownBlogPost_frontmatter
    }
    hero: file(relativePath: {eq: $heroImage}) {
      childImageSharp {
        sizes(maxWidth: 1920) {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
  }
`
