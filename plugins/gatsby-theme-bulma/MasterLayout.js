import React from "react"
import Helmet from "react-helmet"
import "./css/base.scss"

class MasterLayout extends React.Component {
  render() {
    let {sitemetadata} = this.props

    return (
      <div className="MasterLayout is-light">
        <Helmet
          defaultTitle={sitemetadata.siteTitle}
          title={sitemetadata.siteTitle}
          meta={[
            { name: `description`, content: sitemetadata.siteDescr },
            { name: `keywords`, content: `community` },
          ]}
        />
        {this.props.children}
      </div>
    )
  }
}

export default MasterLayout
