import React from 'react';
import Link from "gatsby-link";
import Helmet from 'react-helmet';
// import { config } from 'config';

// import '../static/css/base.scss';

class MasterTemplate extends React.Component {
    render() {
        console.log("js", this)
        const {children, route} = this.props;

        return (
            <div className='MasterTemplate'>
              <Helmet
                // title={ config.siteTitle }
                meta={[
                  {"name": "description", "content": "A living blog written by Jacob Bolda"},
                  {"name": "keywords", "content": "articles, calculators"}
                ]}
              />

            </div>
            );
    }
}

MasterTemplate.propTypes = {
    route: React.PropTypes.object,
}

export default MasterTemplate;

export const pageQuery = graphql`
      query jsBlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug }}) {
          html
          frontmatter {
            title
          }
        }
      }
    `