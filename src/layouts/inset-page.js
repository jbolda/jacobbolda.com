import React from 'react';
import SiteSidebar from '../components/SiteSidebar';

class InsetPageTemplate extends React.Component {
  render() {
    return (
        <div className='PageTemplate'>
          <div className='section'>
            <div className='columns'>
              <div className='column is-one-quarter'>
                <SiteSidebar {...this.props}/>
              </div>
              <div className='column'>
                <div className='box'>
                  { this.props.children() }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default InsetPageTemplate;
