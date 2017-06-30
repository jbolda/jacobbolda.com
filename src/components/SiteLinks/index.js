import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import siteMetadata from '../metadata.yaml';
import '../../static/fonts/fontawesome/style.css';

class SiteLinks extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      site: PropTypes.shape({
        siteMetadata: PropTypes.object.isRequired
      })
    })
  }

  render() {  
        return (
            <div className='blog-social'>
              <ul>
                <li>
                  <a href={ siteMetadata.siteEmailUrl }><i className='fa fa-envelope-o'></i> { siteMetadata.siteEmailPretty }</a>
                </li>
                <li>
                  <a href={ siteMetadata.siteLinkedInUrl }><i className='fa fa-linkedin-square'></i> { siteMetadata.siteLinkedInPretty }</a>
                </li>
                <li>
                  <a href={ siteMetadata.siteTwitterUrl }><i className='fa fa-twitter'></i> { siteMetadata.siteTwitterPretty }</a>
                </li>
                <li>
                  <a href={ siteMetadata.siteGithubUrl }><i className='fa fa-github-alt'></i> { siteMetadata.siteGithubPretty }</a>
                </li>
                <li>
                  <a href={ siteMetadata.siteKeybaseUrl }><i className='fa fa-key'></i> { siteMetadata.siteKeybasePretty }</a>
                </li>
                <li>
                  <a href={ siteMetadata.sitePhotoUrl }><i className='fa fa-camera'></i> { siteMetadata.sitePhotoPretty }</a>
                </li>
              </ul>
            </div>
            );
  }
}

export default SiteLinks;
