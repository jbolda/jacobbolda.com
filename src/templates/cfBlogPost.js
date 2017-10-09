import React from "react"
import BlogPostChrome from "../components/BlogPostChrome"

class cfBlogPost extends React.Component {
  render() {
    const {html, frontmatter} = this.props.data.markdownRemark

    return (
      <BlogPostChrome {...frontmatter}>
        <div className="container content">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </BlogPostChrome>
    )
  }
}

export default cfBlogPost

export const pageQuery = graphql`
  query cfBlogPostByID($id: String!) {
    contentfulBlogPost(fields: { id: { eq: $id } }) {
      html
      ...MarkdownBlogPost_frontmatter
    }
  }
`
