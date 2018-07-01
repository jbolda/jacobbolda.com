import React from "react";
import { StaticQuery } from "gatsby";
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome";

const JSBlogPost = ({ site, data, location, children }) => (
  <SimpleChrome
    post={data.post}
    hero={data.hero}
    sitemetadata={site.siteMetadata}
    location={location}
  >
    {children}
  </SimpleChrome>
);

export default props => (
  <StaticQuery
    query={graphql`
      query NavMetadata {
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
    `}
    render={data => <JSBlogPost site={data.site} {...props} />}
  />
);

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
`;
