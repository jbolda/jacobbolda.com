import React from "react"
import BlogPostChrome from "../components/BlogPostChrome"

class cfBlogPost extends React.Component {
  render() {
    const {content} = this.props.data.contentfulBlogPost

    return (
      <BlogPostChrome {...this.props.data.contentfulBlogPost}>
        <div className="container content">
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>
      </BlogPostChrome>
    )
  }
}

export default cfBlogPost

export const pageQuery = graphql`
  query cfBlogPostByID($id: String!) {
    contentfulBlogPost(fields: { id: { eq: $id } }) {
      ...ContentfulBlogPost
    }
  }
`
