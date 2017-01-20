import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import ReadNext from 'components/ReadNext';

import 'static/css/base.scss';

class ArticleTemplate extends React.Component {
    render() {
        const {children, route} = this.props;
        const post = children.props.route;
        let layout, template

        const home = (
          <div>
            <Link className='gohome' to={ prefixLink('/') }> All Articles
            </Link>
          </div>
        );

        if (post.updated === undefined) {
          var published = (
            <div className='date-published'>
              <p><em>published { moment(post.written).format('D MMM YYYY') }</em></p>
            </div>
          );
        } else {
          var published = (
            <div className='date-published'>
              <p><em>originally published { moment(post.written).format('D MMM YYYY') } and updated { moment(post.updated).format('D MMM YYYY') }</em></p>
            </div>
          );
        }

        return (
            <div className='ArticleTemplate'>
              { home }
              <div className='blog-single'>
                <div className='content text'>
                  { children }
                </div>
                <div className='footer'>
                  <ReadNext post={ post } {...this.props}/>
                  <hr></hr>
                  <p>
                    { config.siteDescr }
                    <a href={ config.siteTwitterUrl }>
                      <br></br> <strong>{ config.siteAuthor }</strong> on Twitter</a>
                  </p>
                </div>
              </div>
            </div>
            );
    }
}

ArticleTemplate.propTypes = {
    route: React.PropTypes.object
}

export default ArticleTemplate;
