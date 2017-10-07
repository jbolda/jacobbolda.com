import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import '../../static/fonts/fontawesome/style.css';

class SiteLinks extends React.Component {
  render() {
      const {siteMetadata} = this.props.data.site

      return (
          <div className='blog-social'>
            <ul>
              <li>
                <a href={`mailto:` + siteMetadata.siteEmailUrl}>
                  <i className='fa fa-envelope-o' /> {siteMetadata.siteEmailPretty}
                </a>
              </li>
              <li>
                <a href={siteMetadata.siteTwitterUrl}>
                  <i className="fa fa-twitter" /> {siteMetadata.siteTwitterPretty}
                </a>
              </li>
              <li>
                <a href={ siteMetadata.siteLinkedInUrl }>
                  <i className='fa fa-linkedin-square' /> {siteMetadata.siteLinkedInPretty}
                </a>
              </li>
              <li>
                <a href={ siteMetadata.siteTwitterUrl }>
                  <i className='fa fa-twitter' /> {siteMetadata.siteTwitterPretty}
                </a>
              </li>
              <li>
                <a href={ siteMetadata.siteGithubUrl }>
                  <i className='fa fa-github-alt' /> {siteMetadata.siteGithubPretty}
                </a>
              </li>
              <li>
                <a href={ siteMetadata.siteKeybaseUrl }>
                  <i className='fa fa-key' /> {siteMetadata.siteKeybasePretty}
                </a>
              </li>
              <li>
                <a href={ siteMetadata.sitePhotoUrl }>
                  <i className='fa fa-camera' /> {siteMetadata.sitePhotoPretty}
                </a>
              </li>
            </ul>
          </div>
          );
  }
}

export default SiteLinks;
