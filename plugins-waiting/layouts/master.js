import React from "react"
import * as PropTypes from "prop-types"
import Helmet from "react-helmet"
import "../static/css/base.scss"
import SiteNav from '../components/SiteNav'
import heartData from '../static/assets/heart-white.svg'

class MasterLayout extends React.Component {
  render() {
    let siteMetadata = this.props.data.site.siteMetadata
    let location = this.props.location.pathname

    return (
      <div className="MasterLayout is-light">
        <Helmet
          defaultTitle={siteMetadata.siteTitle}
          title={siteMetadata.siteTitle}
          meta={[
            { name: `description`, content: siteMetadata.siteDescr },
            { name: `keywords`, content: `articles` },
          ]}
        />
        < SiteNav {...this.props} />
        {this.props.children}
        <section className="footer">
          <div className="container content has-text-centered">
            <p className="copyright">&copy; All rights reserved.</p>
            <p className="copyright">
              Made with <Heart icon={heartData} alt="heart"/> by{` `}
              <a className="copyright" href={siteMetadata.siteTwitterUrl}>Jacob Bolda</a>
            </p>
          </div>
        </section>
      </div>
    )
  }
}

const Heart = ({ icon, alt }) => (
  <img
  src={icon}
  alt={alt}
  style={{
    height: `25px`,
    marginBottom: `-7px`
  }}
  />
)

export default MasterLayout
