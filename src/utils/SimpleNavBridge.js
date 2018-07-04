import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SimpleNav from "../../plugins/gatsby-theme-bulma-layout/Simple/SimpleNav";

const SimpleNavBridge = props => (
  <SimpleNav {...props}>{props.children}</SimpleNav>
);

export default props => (
  <StaticQuery
    query={graphql`
      query NavMetadataSimpleNavBridge {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            siteTwitterUrl
          }
        }
      }
    `}
    render={queryData => <SimpleNavBridge site={queryData.site} {...props} />}
  />
);
