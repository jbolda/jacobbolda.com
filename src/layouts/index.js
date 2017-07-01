import React from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import siteMetadata from '../components/metadata.yaml';
import '../static/css/base.scss';

import InsetPage from './inset-page';
import BlogPost from './blog-post';

class MasterLayout extends React.Component {
    static propTypes = {
      location: PropTypes.object.isRequired
    }

    render() {
        console.log(this)
        let location = this.props.location.pathname;
        let jimmyPage // you jimmy a lock until it opens, so same thing here
        if (location === '/') {
          jimmyPage = this.props.children()
        } else if (location === '/about' || location === '/contact') {
          jimmyPage = <InsetPage {...this.props} />
        } else {
          jimmyPage = <BlogPost {...this.props} />
        };

        return (
            <div className='MasterLayout'>
              <Helmet
                title={ siteMetadata.title }
                meta={[
                  {"name": "description", "content": "A living blog written by Jacob Bolda"},
                  {"name": "keywords", "content": "articles, calculators"}
                ]}
              />
              { jimmyPage }
            </div>
            );
    }
}

export default MasterLayout;
