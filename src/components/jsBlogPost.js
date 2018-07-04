import React from "react";
import SimpleChromeBridge from "../utils/SimpleChromeBridge";

const JSBlogPost = ({ data, location, children }) => (
  <SimpleChromeBridge post={data.post} hero={data.hero} location={location}>
    {children}
  </SimpleChromeBridge>
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
