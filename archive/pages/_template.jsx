import React from 'react';
import { Link } from 'react-router';
import SiteSidebar from 'components/SiteSidebar';

import 'static/css/base.scss';

class PageTemplate extends React.Component {
    render() {
        const {children, route} = this.props;
        const post = children.props.route;

        return (
            <div className='PageTemplate'>
              <div className='section'>
                <div className='columns'>
                  <div className='column is-one-quarter'>
                    <div className='container is-fluid'>
                      <SiteSidebar {...this.props}/>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='box'>
                      <div className='content'>
                          { children }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
    }
}

PageTemplate.propTypes = {
    route: React.PropTypes.object
}

export default PageTemplate;
