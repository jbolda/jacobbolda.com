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
        <header>
          <Link
              style={{
                textDecoration: 'none',
                borderBottom: 'none',
                outline: 'none'
              }}
              to={ prefixLink('/') }>
            <div className='card'>
              <div className='card-image'>
                <figure className='image'>
                  <img src='https://s.gravatar.com/avatar/c02111afdbe9776a53fb197c0f459fb4?s=256' />
                </figure>
              </div>
            </div>
          </Link>
          <div><br />
            { isHome ? (
              <h1 className='title'>
                <Link
                  style={{
                    textDecoration: 'none',
                    borderBottom: 'none',
                    color: 'inherit'
                  }}
                  to={ prefixLink('/') }>
                  { config.siteAuthor }
                </Link>
              </h1>
              ) :
              <h2 className='title'>
                <Link
                  style={{
                    textDecoration: 'none',
                    borderBottom: 'none',
                    color: 'inherit'
                  }}
                  to={ prefixLink('/') }>
                  { config.siteAuthor }
                </Link>
              </h2>
            }
            <p className='subtitle'>
              { config.siteDescr }
            </p>
          </div>
        </header>
        )

        return (
            <div className='box'>
              <div className='sidebar-inner'>
                <div className='blog-details'>
                  <header>
                    { header }
                  </header>
                </div>
                <div className='blog-options'>
                  <SiteNav {...this.props}/>
                  <footer>
                    <SiteLinks {...this.props}/>
                    <p className='copyright'>
                      &copy; All rights reserved.
                    </p>
                  </footer>
                </div>
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
