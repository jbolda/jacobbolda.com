import React from "react"
import Helmet from "react-helmet"
import "../static/css/base.scss"

class MasterLayout extends React.Component {
  render() {
    let siteMetadata = this.props.siteMetadata

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
      </div>
    )
  }
}

export default MasterLayout
