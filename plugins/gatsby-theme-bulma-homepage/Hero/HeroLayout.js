import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";
import SimpleNav from "../../gatsby-theme-bulma-layout/Simple/SimpleNav";
import SiteLinks from "../shared-components/SiteLinks";

class HeroLayout extends React.Component {
  render() {
    const { siteMetadata } = this.props.data.site;

    return (
      <SimpleNav sitemetadata={siteMetadata} location={this.props.location}>
        <section className="hero is-small is-secondary edge--bottom">
          <div className="hero-body">
            <div className="columns is-centered is-vcentered has-text-centered">
              <div className="column is-one-third">
                <Img
                  className="image"
                  Tag="figure"
                  sizes={this.props.data.file.childImageSharp.sizes}
                />
              </div>
              <div className="column">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <h3 className="subtitle">Hi, I am</h3>
                    <h1 className="title">Jacob Bolda</h1>
                    <h2 className="subtitle">Structural Engineer</h2>
                    <div className="" style={{ textAlign: "justify" }}>
                      <p>
                        Focusing on the intersection of tech and Structural
                        Engineering. Masters degree in Structural Engineering
                        from the Milwaukee School of Engineering, undergrad in
                        Architectural Engineering with a minor in Management,
                        and a deep understanding of software and programming.
                        Marrying that experience with problem solving and
                        systematizing is powerful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="columns">
              <div className="column is-one-quarter">
                <SiteLinks {...this.props} />
              </div>
              <div className="column">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.about.childMarkdownRemark.html
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        {this.props.children}
      </SimpleNav>
    );
  }
}

export default HeroLayout;
