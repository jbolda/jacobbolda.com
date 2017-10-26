import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import "../static/css/base.scss"
import SiteNav from '../components/SiteNav'

class MasterLayout extends React.Component {
  render() {
    let siteMetadata = this.props.data.site.siteMetadata
    let location = this.props.location.pathname

    return (
      <div className="MasterLayout is-light">
        <Helmet
          defaultTitle={siteMetadata.title}
          meta={[
            { name: `description`, content: siteMetadata.siteDescr },
            { name: `keywords`, content: `articles` },
          ]}
        />
        < SiteNav {...this.props} />
        {this.props.children}
        <div className="footer">
          <div className="container content has-text-centered">
            <p className="copyright">&copy; All rights reserved.</p>
            <p className="copyright">
              Made with <i className="fa fa-heart" aria-hidden="true" /> by{` `}
              <a href={siteMetadata.siteTwitterUrl}>Jacob Bolda</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MasterLayout
