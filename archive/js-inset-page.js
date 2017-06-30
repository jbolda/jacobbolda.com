import React from 'react';
import SiteSidebar from '../components/SiteSidebar';
import siteMetadata from '../components/metadata.yaml';

class jsInsetPageTemplate extends React.Component {
  render() {
    console.log(this)
    // const data = this.props.data.jsFrontmatter
    this.props.data.siteMetadata = {...siteMetadata};

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
                  { this.props.pageResources.component }
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default jsInsetPageTemplate;

export const pageQuery = graphql`
    query jsInsetPageBySlug($slug: String!) {
      jsFrontmatter(fields: { slug: { eq: $slug }}) {
        data {
          layoutType
          path
          error
          title
          written
          category
          description
          updated
        }
      }
    }
`
