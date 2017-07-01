import React from 'react';

class markdownTemplate extends React.Component {
  render() {
    const data = this.props.data.markdownRemark;

    return (
        <div className='content'>
          <div className='markdown section'>
            <div className='container content'>
              <div dangerouslySetInnerHTML={{ __html: data.html }} />
            </div>
          </div>
        </div>
    )
  }
}

export default markdownTemplate;

export const pageQuery = graphql`
    query markdownTemplateBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug }}) {
        html
        frontmatter {
          title
        }
      }
    }
`
