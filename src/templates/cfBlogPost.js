import React from "react"
import BlogPostChrome from "../components/BlogPostChrome"

class cfBlogPost extends React.Component {
  render() {
    const frontmatter = this.props.data.post
    const {hero} = this.props.data
    const {html} = frontmatter.content.childMarkdownRemark
    const p = {hero: hero, post: {frontmatter: frontmatter}}

    return (
      <BlogPostChrome {...p}>
        <h1 className="title is-1">{frontmatter.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPostChrome>
    )
  }
}

export default cfBlogPost

export const pageQuery = graphql`
  query cfBlogPostByID($id: String!, $heroImage: String!) {
    post: contentfulBlogPost(id: { eq: $id }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      ...cfBlogPost
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
