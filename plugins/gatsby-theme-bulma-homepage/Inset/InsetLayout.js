import React from "react"
import SiteSidebar from "./SiteSidebar"
import SimpleNav from "../../gatsby-theme-bulma-layout/Simple/SimpleNav"

class InsetLayout extends React.Component {
  render() {
    const {siteMetadata} = this.props.data.site

    return (
      <SimpleNav sitemetadata={siteMetadata} location={this.props.location}>
        <div className="PageTemplate section container is-primary">
          <div className="columns">
            <div className="column is-one-quarter">
              <SiteSidebar {...this.props} />
            </div>
            <div className="column">
              {this.props.children}
            </div>
          </div>
        </div>
      </SimpleNav>
    )
  }
}

export default InsetLayout
