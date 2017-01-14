import React from 'react';
import DocumentTitle from 'react-document-title';
import { config } from 'config';
import SiteLinks from 'components/SiteLinks';
import SiteSidebar from 'components/SiteSidebar';

exports.data = {
  path: 'contact'
}

class ContactMe extends React.Component {
    render() {
        const {location, children} = this.props

        return (
            <DocumentTitle title={ config.siteTitle }>
              <div className='section'>
                <div className='columns'>
                  <div className='column is-one-quarter'>
                    <div className='container is-fluid'>
                      <SiteSidebar {...this.props}/>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='container'>
                      <div className='box content'>
                        <p>
                          I would love to hear from you!
                        </p>
                        <SiteLinks {...this.props}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DocumentTitle>
            );
    }
}

SiteSidebar.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
}

export default ContactMe;
