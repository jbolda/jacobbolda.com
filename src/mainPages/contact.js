import React from 'react';
import Helmet from 'react-helmet';
import SiteLinks from '../components/SiteLinks';
import InsetLayout from '../../plugins/gatsby-theme-bulma-homepage/Inset/InsetLayout'

exports.data = {
  layoutType: 'page',
  path: '/contact/'
}

class ContactMe extends React.Component {
    render() {

        return (
          <InsetLayout {...this.props}>
            <div className='box content'>
              <p>
                I would love to hear from you!
              </p>
              <SiteLinks {...this.props}/>
            </div>
          </InsetLayout>
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
      siteAngelListUrl
      siteAngelListPretty
      sitePhotoUrl
      sitePhotoPretty
    }
  }
  file(relativePath: {eq: "assets/profile.png"}) {
    childImageSharp {
      sizes(maxWidth: 256) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
}
`
