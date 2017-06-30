import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import moment from 'moment';

class jsBlogPostTemplate extends React.Component {
  render() {
      console.log(this)
      let data = this.props.data.markdownRemark.frontmatter;

      const home = (
        <div className='nav'>
          <div className='container'>
            <div className='nav-left'>
              <Link
                className='nav-item is-tab is-active'
                to={ '/' }>
                Home
              </Link>
            </div>
          </div>
        </div>
      );

      if (data.updated === undefined) {
        var published = (
          <div className='date-published'>
            <p><em>published { moment(data.written).format('D MMM YYYY') }</em></p>
          </div>
        );
      } else {
        var published = (
          <div className='date-published'>
            <p><em>originally published { moment(data.written).format('D MMM YYYY') } and updated { moment(data.updated).format('D MMM YYYY') }</em></p>
          </div>
        );
      }

      return (
          <div className='ArticleTemplate'>
            <Helmet
              title={ data.title }
              meta={[
                { name: 'description', content: data.description },
                { property: 'og:url', content: ('https://www.jacobbolda.com/'+data.path) },
                { property: 'og:description', content: data.description },
                { property: 'og:type', content: 'article' },
                { property: 'og:article:author', content: 'Jacob Bolda' },
                { property: 'og:article:published_time', content: moment(data.written, 'YYYY-MM-DD') },
                { property: 'og:article:modified_time', content: moment(data.updated, 'YYYY-MM-DD') },
                { property: 'og:article:tag', content: data.category },
                { name: 'twitter:label1', content: 'Category' },
                { name: 'twitter:data1', content: data.category },
                { name: 'twitter:label2', content: 'Written' },
                { name: 'twitter:data2', content: data.written },
              ]}
            />
            { home }
            <div className=''>

            </div>
            <div className='footer container'>
              { published }
              <ReadNext post={ post } {...this.props}/>
              <hr></hr>
              <p>
                { config.siteDescr }
                <a href={ config.siteTwitterUrl }>
                  <br></br> <strong>{ config.siteAuthor }</strong> on Twitter</a>
              </p>
            </div>
          </div>
          );
  }
}

export default jsBlogPostTemplate;

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
