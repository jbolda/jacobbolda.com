import React from "react";
import { graphql } from "gatsby";
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome";

const jsBlogPost = ({ props }) => (
  <SimpleChrome
    post={props.data.post}
    hero={props.data.hero}
    sitemetadata={props.data.site.siteMetadata}
    location={props.location}
  >
    {props.children}
  </SimpleChrome>
);

export default jsBlogPost;

export const blogPostFragment = graphql`
  fragment JSBlogPost on JavascriptFrontmatter {
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
  fragment metadata on Site {
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
`;
