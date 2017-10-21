import React from "react"
import HelmetBlock from "../HelmetBlock"
import PostPublished from "../PostPublished"

class BlogPostChrome extends React.Component {
  render() {
    const frontmatter = this.props

    return (
      <div className="BlogPostChrome container">
        <HelmetBlock {...frontmatter} />
        <div className="container">
          <div className="content has-text-justified">
            {this.props.children}
          </div>
        </div>
        <div className="container">
          <PostPublished {...frontmatter} />
        </div>
      </div>
    )
  }
}

export default BlogPostChrome

export const blogPostFragment = graphql`
  fragment MarkdownBlogPost_frontmatter on MarkdownRemark {
    frontmatter {
      title
      path
      layoutType
      written(formatString: "MMMM Do YYYY")
      updated(formatString: "MMMM Do YYYY")
      category
      description
    }
  }
  fragment JSBlogPost_data on JSFrontmatter {
    data {
      title
      path
      layoutType
      written(formatString: "MMMM Do YYYY")
      updated(formatString: "MMMM Do YYYY")
      category
      description
    }
  }
  fragment cfBlogPost on ContentfulBlogPost {
      title
      path
      layoutType
      written(formatString: "MMMM Do YYYY")
      updated(formatString: "MMMM Do YYYY")
      category
      description {description}
  }
`
