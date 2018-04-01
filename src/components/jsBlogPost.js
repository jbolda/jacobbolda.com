import React from "react"
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome"

class jsBlogPost extends React.Component {
  render() {
    console.log(this)
    return (
      <SimpleChrome
      post={this.props.data.post}
      hero={this.props.data.hero}
      sitemetadata={this.props.data.site.siteMetadata}
      location={this.props.location}
      >
        {this.props.children}
      </SimpleChrome>
    )
  }
}

export default jsBlogPost

export const blogPostFragment = graphql`
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
`
