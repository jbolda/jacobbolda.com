import React from 'react'
import DocumentTitle from 'react-document-title'
import SitePagejs from '../components/SitePagejs'
import { config } from 'config'

class jsWrapper extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        let layout, template

        layout = post.layout

        template = <SitePagejs {...this.props}/>

        return (
            <DocumentTitle title={ `${post.title} - ${config.siteTitle}` }>
              <div>
                { template }
              </div>
            </DocumentTitle>
            );
    }
}

MarkdownWrapper.propTypes = {
    route: React.PropTypes.object,
}

export default jsWrapper