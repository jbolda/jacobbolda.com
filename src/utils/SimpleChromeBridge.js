import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SimpleChrome from "../../plugins/gatsby-theme-bulma-blog/Simple/SimpleChrome";

const SimpleChromeBridge = props => (
  <SimpleChrome
    post={props.post}
    hero={props.hero}
    siteMetadata={props.site.siteMetadata}
    location={props.location}
    {...props}
  >
    {props.children}
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
