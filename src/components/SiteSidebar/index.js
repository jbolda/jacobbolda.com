import React from "react"
import Link from "gatsby-link"
import SiteLinks from "../SiteLinks"

class SiteSidebar extends React.Component {
    render() {
        const isHome = this.props.location.pathname === ('/');
        const {siteMetadata} = this.props.data.site;
        // TODO, deal with image more nice like

    return (
      <div className="">
        <div className="box is-fullwidth" style={{padding: `0px`}}>
          <Link to={`/`}>
            <figure className="image">
              <img src="https://s.gravatar.com/avatar/c02111afdbe9776a53fb197c0f459fb4?s=256" />
            </figure>
          </Link>
          <div className="card-content">
            <p className="title">
              <Link
                style={{
                  textDecoration: `none`,
                  borderBottom: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {siteMetadata.siteTitle}
              </Link>
            </p>
            <p style={{ fontStyle: `italic` }}>
              {siteMetadata.siteDescr}
            </p>
          </div>
        </div>
        <div className="is-hidden-mobile">
          <SiteLinks {...this.props} />
        </div>
      </div>
    )
  }
}

export default SiteSidebar
