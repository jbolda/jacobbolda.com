import React from "react";
// import { StaticQuery } from "gatsby";
import MasterLayout from "../../gatsby-theme-bulma/MasterLayout";
import SimpleTopNav from "./components/SimpleTopNav";
import heartData from "./assets/heart-white.svg";

import styles from "./palette.json";

const SimpleNav = ({ location, site, children }) => (
  <MasterLayout sitemetadata={site.siteMetadata} id="SimpleLayout">
    <SimpleTopNav
      sitemetadata={site.siteMetadata}
      location={location}
      textColor={styles.colors.P5}
    />
    {children}
    <section className="footer">
      <div className="container content has-text-centered">
        <p className="copyright">
          Made with <Heart icon={heartData} alt="heart" /> by{` `}
          <a className="copyright" href={site.siteMetadata.siteTwitterUrl}>
            Jacob Bolda
          </a>
        </p>
      </div>
    </section>
  </MasterLayout>
);

const Heart = ({ icon, alt }) => (
  <img
    src={icon}
    alt={alt}
    style={{
      height: `25px`,
      marginBottom: `-7px`
    }}
  />
);

export default SimpleNav;
/*
export default props => (
  <StaticQuery
    query={graphql`
      query NavQuery {
        site {
          siteMetadata {
            siteTitle
            siteDescr
            siteAuthor
            siteTwitterUrl
          }
        }
      }
    `}
    render={data => <SimpleLayout data={data} {...props} />}
  />
);
*/
