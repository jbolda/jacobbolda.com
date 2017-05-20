import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { config } from 'config';

import 'static/css/base.scss';

class MasterTemplate extends React.Component {
    render() {
        const {children, route} = this.props;

        return (
            <div className='MasterTemplate'>
              <Helmet
                title={ config.siteTitle }
                meta={[
                  {"name": "description", "content": "A living blog written by Jacob Bolda"},
                  {"name": "keywords", "content": "articles, calculators"}
                ]}
              />
              { children }
            </div>
            );
    }
}

MasterTemplate.propTypes = {
    route: React.PropTypes.object,
}

export default MasterTemplate;
