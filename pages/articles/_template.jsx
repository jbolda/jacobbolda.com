import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import ReadNext from 'components/ReadNext';

import 'static/css/base.scss';

class ArticleTemplate extends React.Component {
    render() {
        const {children, route} = this.props;
        const post = children.props.route;
        const data = post.page.data;
        let layout, template

        const home = (
          <div className='nav'>
            <div className='container'>
              <div className='nav-left'>
                <Link
                  className='nav-item is-tab is-active'
                  to={ prefixLink('/') }>
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
                  { property: 'og:url', content: ('https://www.jacobbolda.com'+data.path) },
                  { property: 'og:description', content: data.description },
                  { property: 'og:type', content: 'article' },
                  { property: 'og:article:author', content: 'Jacob Bolda' },
                  { property: 'og:article:published_time', content: moment(data.written, 'YYYY-MM-DD') },
                  { property: 'og:article:modified_time', content: moment(data.updated, 'YYYY-MM-DD') },
                  { property: 'og:article:tag', content: data.category },
                  { property: 'label1', content: 'Category' },
                  { property: 'data1', content: data.category },
                  { property: 'label2', content: 'Written' },
                  { property: 'data2', content: data.written },
                ]}
              />
              { home }
              <div className=''>
                { children }
              </div>
              <div className='footer blog-single'>
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

ArticleTemplate.propTypes = {
    route: React.PropTypes.object
}

export default ArticleTemplate;
