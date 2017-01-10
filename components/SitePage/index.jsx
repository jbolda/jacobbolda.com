import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import access from 'safe-access'
import { config } from 'config'
import SiteSidebar from '../SiteSidebar'
import './style.css';

class SitePage extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data

        return (
              <div className='section'>
                <div className='columns'>
                  <div className='column is-one-quarter'>
                    <div className='container is-fluid'>
                      <SiteSidebar {...this.props}/>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <div className='content'>
                          <h1>{ post.title }</h1>
                          <div dangerouslySetInnerHTML={ {    __html: post.body} } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
    }
}

SitePage.propTypes = {
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default SitePage