import React from "react"
import BlogPostChrome from "../components/BlogPostChrome"
import Img from 'gatsby-image'

class cfBlogPost extends React.Component {
  render() {
    console.log(this)
    const frontmatter = this.props.data.post
    const {html} = frontmatter.content.childMarkdownRemark

    return (
      <BlogPostChrome {...this.props.data.contentfulBlogPost}>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <Img sizes={this.props.data.hero.childImageSharp.sizes} />
            </div>
          </div>
        </section>
        <h1 className="title is-1">{frontmatter.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </BlogPostChrome>
    )
  }
}

export default cfBlogPost

export const pageQuery = graphql`
  query cfBlogPostByID($id: String!) {
    post: contentfulBlogPost(id: { eq: $id }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      ...cfBlogPost
    }
    hero: file(relativePath: {eq: "external/hero-images/on-las-vegas.jpg"}) {
      childImageSharp {
        # Specify the image processing steps right in the query
        # Makes it trivial to update as your page's design changes.
        sizes {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
  }
`
