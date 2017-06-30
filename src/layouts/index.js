import React from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import siteMetadata from '../components/metadata.yaml';
import '../static/css/base.scss';

import InsetPage from './inset-page';

class MasterLayout extends React.Component {
    static propTypes = {
      location: PropTypes.object.isRequired
    }

    render() {
        console.log(this)

        return (
            <div className='MasterLayout'>
              <Helmet
                title={ siteMetadata.title }
                meta={[
                  {"name": "description", "content": "A living blog written by Jacob Bolda"},
                  {"name": "keywords", "content": "articles, calculators"}
                ]}
              />
              <InsetPage {...this.props} />
            </div>
            );
    }
}

export default MasterLayout;

export const pageQuery = graphql`
      query componentMetadata
          {
            site {
              siteMetadata {
                title
                siteDescr
                siteAuthor
                siteEmailUrl
                siteEmailPretty
                siteLinkedInUrl
                siteLinkedInPretty
                siteTwitterUrl
                siteTwitterPretty
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
