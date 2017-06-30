import React from 'react';
import SiteSidebar from '../components/SiteSidebar';
import siteMetadata from '../components/metadata.yaml';

class markdownInsetPageTemplate extends React.Component {
  render() {
    const data = this.props.data.markdownRemark;
    this.props.data.siteMetadata = {...siteMetadata};

    return (
        <div className='PageTemplate'>
          <div className='section'>
            <div className='columns'>
              <div className='column is-one-quarter'>
                <SiteSidebar {...this.props}/>
              </div>
              <div className='column'>
                <div className='box'>
                  <div className='content'>
                    <div className='markdown section'>
                      <div className='container content'>
                        <div dangerouslySetInnerHTML={{ __html: data.html }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default markdownInsetPageTemplate;

export const pageQuery = graphql`
    query markdownInsetPageBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug }}) {
        html
        frontmatter {
          title
        }
      }
    }
`
