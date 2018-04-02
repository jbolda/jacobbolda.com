import React from "react"
import HelmetBlock from "../HelmetBlock"
import PostPublished from "../PostPublished"
import Img from 'gatsby-image'

class BlogPostChrome extends React.Component {
  render() {
    const {frontmatter} = this.props.post
    const HeroImage = (props) => {
      if (props.hero) {
        return (
          <section className="hero is-medium">
            <div className="container-fluid">
             <Img className="image" sizes={props.hero.childImageSharp.sizes} />
            </div>
          </section>
        )
      } else {
        return (<div/>)
      }
    }
    const adjustTitleStyle = (this.props.hero) ? {
                                      color: "white",
                                      textShadow: [
                                          "1px 1px 0 #000",
                                        "-1px -1px 0 #000",  
                                         "1px -1px 0 #000",
                                         "-1px 1px 0 #000",
                                          "1px 1px 0 #000",
                                      ]
                                      } : {}
    const adjustPostStyle = (this.props.hero) ? {marginTop: "-30%"} : {}

    return (
      <div className="BlogPostChrome">
        <HeroImage {...this.props}/>
        <section className="section" style={{paddingBottom: "1rem", ...adjustPostStyle}}>
          <div className="container">
            <h1 className="title is-1 is-hidden-mobile" style={{fontSize: "5rem",...adjustTitleStyle}}>
              {frontmatter.title}
            </h1>
            <h1 className="title is-hidden-tablet" style={{fontSize: "2rem",...adjustTitleStyle}}>
              {frontmatter.title}
            </h1>
          </div>
        </section>
        <section className="section" style={{paddingTop: "0px"}}>
          <div className="container">
            <div className="box">
              {this.props.children}
              <PostPublished {...frontmatter} />
            </div>
          </div>
        </section>
        <HelmetBlock {...frontmatter} />
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
    frontmatter: data {
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
