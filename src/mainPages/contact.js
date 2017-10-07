import React from 'react';
import Helmet from 'react-helmet';
import SiteLinks from '../components/SiteLinks';

exports.data = {
  layoutType: 'page',
  path: '/contact/'
}

class ContactMe extends React.Component {
    render() {

        return (
            <div className='box container content'>
              <p>
                I would love to hear from you!
              </p>
              <SiteLinks {...this.props}/>
            </div>
            );
    }
}

export default ContactMe;

export const pageQuery = graphql`
query ContactMe {
  site {
    siteMetadata {
      siteTitle
      siteDescr
      siteAuthor
      siteEmailUrl
      siteEmailPretty
      siteTwitterUrl
      siteTwitterPretty
      siteLinkedInUrl
      siteLinkedInPretty
      siteGithubUrl
      siteGithubPretty
      siteKeybaseUrl
      siteKeybasePretty
      sitePhotoUrl
      sitePhotoPretty
    }
  }
}
`
