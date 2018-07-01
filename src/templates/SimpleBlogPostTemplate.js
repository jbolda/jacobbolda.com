import React from "react";
import { graphql } from "gatsby";
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome";

class SimpleBlogPostTemplate extends React.Component {
  render() {
    const { html, frontmatter } = this.props.data.post;

    return (
      <SimpleChrome
        post={this.props.data.post}
        hero={this.props.data.hero}
        sitemetadata={this.props.data.site.siteMetadata}
        location={this.props.location}
      >
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </SimpleChrome>
    );
  }
}

export default SimpleBlogPostTemplate;

export const pageQuery = graphql`
  query SimpleBlogPostTemplatePostBySlug($slug: String!, $heroImage: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
    hero: file(relativePath: { eq: $heroImage }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
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
      }
    }
  }
`;
