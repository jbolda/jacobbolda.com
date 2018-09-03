import React from "react";
import { graphql } from "gatsby";
import SimpleChromeBridge from "../utils/SimpleChromeBridge";
import { render } from "react-testing-library";

const JSBlogPost = props => (
  <SimpleChromeBridge
    post={props.data.post}
    hero={props.data.hero}
    location={props.location}
    {...props}
  />
);

export const blogPostFragment = graphql`
  fragment JSBlogPost on JavascriptFrontmatter {
    frontmatter {
      title
      path
      layoutType
      writtenPretty: written(formatString: "MMMM Do YYYY")
      updatedPretty: updated(formatString: "MMMM Do YYYY")
      written
      updated
      category
      description
    }
  }
`;

export default JSBlogPost;
