import React from "react"
import BlogPostChrome from "../components/BlogPostChrome"

class cfBlogPost extends React.Component {
  render() {
    const frontmatter = this.props.data.contentfulBlogPost
    const {html} = frontmatter.content.childMarkdownRemark

    return (
      <BlogPostChrome {...this.props.data.contentfulBlogPost}>
        <h1 className="title is-1">{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPostChrome>
    )
  }
}

export default cfBlogPost

export const pageQuery = graphql`
  query cfBlogPostByID($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      ...cfBlogPost
    }
  }
`
