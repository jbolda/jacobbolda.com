import React from 'react'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import './style.css'

class SiteSidebar extends React.Component {
    render() {
        const {location, children} = this.props
        const isHome = location.pathname === prefixLink('/')

        let header = (
        <header className='card is-fullwidth'>
          <Link
            to={ prefixLink('/') }>
            <div className='card-image'>
              <figure className='image'>
                <img src='https://s.gravatar.com/avatar/c02111afdbe9776a53fb197c0f459fb4?s=256' />
              </figure>
            </div>
          </Link>
          <div className='card-content'>
            <p className='title'>
              <Link
                style={{
                  textDecoration: 'none',
                  borderBottom: 'none',
                  color: 'inherit'
                }}
                to={ prefixLink('/') }>
                { config.siteAuthor }
              </Link>
            </p>
            <p
              style={{'fontStyle': 'italic'}}>
              { config.siteDescr }
            </p>
          </div>
        </header>
        )

        return (
            <div className='container'>
              { header }
              <div className='box'>
                <SiteNav {...this.props}/>
                <footer>
                  <div className='is-hidden-mobile'>
                    <SiteLinks {...this.props} />
                  </div>
                  <div>
                    <p className='copyright'>
                      &copy; All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </div>
            );
    }
}

SiteSidebar.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
}

export default SiteSidebar
