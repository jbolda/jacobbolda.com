import React from "react";
import PropTypes from "prop-types";
import SimpleNav from "gatsby-theme-bulma-layout/src/components/Simple/SimpleNav";

class SimpleBlogPostLayout extends React.Component {
  render() {
    let { siteMetadata } = this.props;

    return (
      <SimpleNav site={{ siteMetadata: siteMetadata }} {...this.props}>
        {this.props.children}
        <section className="section">
          <hr />
          <div className="container">
            <p>
              {siteMetadata.siteDescription}
              <a href={siteMetadata.siteTwitterUrl}>
                <br /> <strong>{siteMetadata.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </section>
      </SimpleNav>
    );
  }
}

export default SimpleBlogPostLayout;

SimpleBlogPostLayout.propTypes = {
  siteMetadata: PropTypes.shape({
    siteAuthor: PropTypes.string.isRequired,
    siteDescription: PropTypes.string.isRequired,
    siteTwitterUrl: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.any.isRequired
};
