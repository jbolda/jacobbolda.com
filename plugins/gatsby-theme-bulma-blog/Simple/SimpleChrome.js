import React from "react";
import PropTypes from "prop-types";
import SimpleBlogPostLayout from "./SimpleBlogPostLayout";
import HelmetBlock from "./components/HelmetBlock";
import PostPublished from "./components/PostPublished";
import Img from "gatsby-image";

class SimpleChrome extends React.Component {
  render() {
    const { frontmatter } = this.props.post;
    const adjustTitleStyle = this.props.hero
      ? {
          color: "white",
          textShadow: [
            "1px 1px 0 #000",
            "-1px -1px 0 #000",
            "1px -1px 0 #000",
            "-1px 1px 0 #000",
            "1px 1px 0 #000"
          ]
        }
      : {};
    const adjustPostStyle = this.props.hero ? { marginTop: "-20%" } : {};

    const BlogSection = children => (
      <section
        className="section"
        style={{ paddingBottom: "1rem", ...adjustPostStyle }}
      >
        <div className="container">
          <ColumnContainer>
            <h1
              className="title is-1"
              style={{
                paddingLeft: 24,
                paddingRight: 40,
                ...adjustTitleStyle
              }}
            >
              {frontmatter.title}
            </h1>
            <div className="notification">
              {children}
              <PostPublished frontmatter={frontmatter} />
            </div>
          </ColumnContainer>
        </div>
      </section>
    );

    const HeroImage = props => {
      if (props.hero) {
        return (
          <section className="hero is-medium">
            <div className="container-fluid">
              <Img className="image" fluid={props.hero.childImageSharp.fluid} />
            </div>
          </section>
        );
      } else {
        return null;
      }
    };

    return (
      <SimpleBlogPostLayout
        siteMetadata={this.props.siteMetadata}
        location={this.props.location}
      >
        <HeroImage hero={this.props.hero} />
        <BlogSection>{this.props.children}</BlogSection>
        <HelmetBlock frontmatter={frontmatter} />
      </SimpleBlogPostLayout>
    );
  }
}

export default SimpleChrome;

/*
    if (this.props.componentOverride) {
      return this.props.componentOverride;
    } else if (this.props.componentBlocks) {
      return (
        <section
          className="section"
          style={{ paddingBottom: "1rem", ...adjustPostStyle }}
        >
          <ColumnContainer>
            <h1
              className="title is-1"
              style={{
                paddingLeft: 24,
                paddingRight: 40,
                ...adjustTitleStyle
              }}
            >
              {frontmatter.title}
            </h1>
          </ColumnContainer>
          {this.props.componentBlocks.map(block => {
            if (block.wrapper === "break-out") {
              return (
                <div key={block.wrapper} className="container">
                  {block.renderComponent()}
                </div>
              );
            } else {
              return (
                <ColumnContainer key={block.wrapper}>
                  {block.renderComponent()}
                </ColumnContainer>
              );
            }
          })}
          <ColumnContainer>
            <div className="notification">
              <PostPublished frontmatter={frontmatter} />
            </div>
          </ColumnContainer>
        </section>
      );
          } else {


          }
*/

SimpleChrome.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  hero: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.object
    })
  }),
  children: PropTypes.any
};

const ColumnContainer = ({ children }) => (
  <div className="columns is-centered">
    <div className="column is-half">{children}</div>
  </div>
);
