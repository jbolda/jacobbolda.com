import React from 'react'
import Link from 'gatsby-link'
import SiteNav from '../SiteNav'
import SiteLinks from '../SiteLinks'
import '../../static/css/base.scss';
import siteMetadata from '../metadata.yaml';
// import './style.css'

class SiteSidebar extends React.Component {
    render() {
        const isHome = location.pathname === ('/');
        // const siteMetadata = this.props.siteMetadata;
        // console.log(this)

        let header = (
        <div className='card is-fullwidth'>
          <div className='card-image'>
            <Link
              to={ '/' }>
              <figure className='image'>
                <img src='https://s.gravatar.com/avatar/c02111afdbe9776a53fb197c0f459fb4?s=256' />
              </figure>
            </Link>
          </div>
          <div className='card-content'>
            <p className='title'>
              <Link
                style={{
                  textDecoration: 'none',
                  borderBottom: 'none',
                  color: 'inherit'
                }}
                to={ '/' }>
                { siteMetadata.siteAuthor }
              </Link>
            </p>
            <p
              style={{'fontStyle': 'italic'}}>
              { siteMetadata.siteDescr }
            </p>
          </div>
        </div>
        )

        return (
            <div className=''>
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

const pageQuery = graphql`
    fragment siteMetadata on siteMetadata {
        siteTitle,
        siteDescr,
        siteAuthor,
        siteEmailUrl,
        siteEmailPretty,
        siteLinkedInUrl,
        siteLinkedInPretty,
        siteTwitterUrl,
        siteTwitterPretty,
        siteGithubUrl,
        siteGithubPretty,
        siteKeybaseUrl,
        siteKeybasePretty,
        sitePhotoUrl,
        sitePhotoPretty,
    }
`
