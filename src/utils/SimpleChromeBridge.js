import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome";

const SimpleChromeBridge = ({ site, post, hero, location, children }) => (
  <SimpleChrome
    post={post}
    hero={hero}
    siteMetadata={site.siteMetadata}
    location={location}
  >
    {children}
  </SimpleChrome>
);

export default props => (
  <StaticQuery
    query={graphql`
      query NavMetadataSimpleChromeBridge {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            siteAuthor
            siteEmailUrl
            siteEmailPretty
            siteTwitterUrl
            siteTwitterPretty
          }
        }
      }
    `}
    render={queryData => (
      <SimpleChromeBridge site={queryData.site} {...props} />
    )}
  />
);
