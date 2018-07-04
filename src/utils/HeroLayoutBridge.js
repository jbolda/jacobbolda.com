import React from "react";
import { StaticQuery, graphql } from "gatsby";
import HeroLayout from "../../plugins/gatsby-theme-bulma-homepage/Hero/HeroLayout";

const HeroLayoutBridge = props => (
  <HeroLayout {...props}>{props.children}</HeroLayout>
);

export default props => (
  <StaticQuery
    query={graphql`
      query NavMetadataHeroLayoutBridge {
        site {
          siteMetadata {
            siteTitle
            siteDescription
            siteTwitterUrl
          }
        }
      }
    `}
    render={queryData => <HeroLayoutBridge site={queryData.site} {...props} />}
  />
);
