import React from "react"
import Link from "gatsby-link"
import SiteNav from "../SiteNav"
import SiteLinks from "../SiteLinks"

class SiteSidebar extends React.Component {
    render() {
        const isHome = this.props.location.pathname === ('/');
        const {siteMetadata} = this.props.data.site;
        // TODO, deal with image more nice like

    let header = (
      <div className="">
        <div className="card-image">
          <Link to={`/`}>
            <figure className="image">
              <img src="https://s.gravatar.com/avatar/c02111afdbe9776a53fb197c0f459fb4?s=256" />
            </figure>
          </Link>
        </div>
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
    )

    return (
      <div className="card is-fullwidth">
        {header}
        <div className="card-content">
          <SiteNav {...this.props} />
          <footer>
            <div className="is-hidden-mobile">
              <SiteLinks {...this.props} />
            </div>
            <div>
              <p className="copyright">&copy; All rights reserved.</p>
              <p className="copyright">
                Made with <i className="fa fa-heart" aria-hidden="true" /> by{` `}
                <Link to={siteMetadata.siteTwitterUrl}>Jacob Bolda</Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default SiteSidebar
