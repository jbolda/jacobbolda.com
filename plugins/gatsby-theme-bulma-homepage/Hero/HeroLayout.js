import React from "react"
import Link from "gatsby-link"
import Img from 'gatsby-image'
import SimpleNav from "../../gatsby-theme-bulma-layout/Simple/SimpleNav"

class InsetLayout extends React.Component {
  render() {
    const {siteMetadata} = this.props.data.site

    return (
      <SimpleNav sitemetadata={siteMetadata} location={this.props.location}>
        <section className="hero is-medium is-secondary is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <Link to={`/`}>
                  <figure className="image">
                    <Img className="image" sizes={this.props.data.file.childImageSharp.sizes} />
                  </figure>
                </Link>
              </h1>
              <h2 className="subtitle">
                Hero subtitle
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          {this.props.children}
        </section>
      </SimpleNav>
    )
  }
}

export default InsetLayout
