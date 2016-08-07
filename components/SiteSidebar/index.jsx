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
          <Link style={ {    textDecoration: 'none',    borderBottom: 'none',    outline: 'none'} } to={ prefixLink('/') }>
          <img src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhnAAAAJDM3YzExODMwLTkyYmItNDk0Ni1iY2Q5LTA4ZmNhMmEwODU3Nw.jpg' width='75' height='75' />
          </Link>
          { isHome ? (
            <div>
              <h1><Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ prefixLink('/') }> { config.siteAuthor } </Link></h1>
              <h4><span>Milwaukee, WI </span><span className='glyphicon glyphicon-home'></span></h4>
            </div>
            ) :
            <h2><Link style={ {    textDecoration: 'none',    borderBottom: 'none',    color: 'inherit'} } to={ prefixLink('/') }> { config.siteAuthor } </Link></h2> }
          <p>
            { config.siteDescr }
          </p>
        </header>
        )

        return (
            <div className='sidebar'>
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