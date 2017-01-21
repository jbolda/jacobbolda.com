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
        const data = post.page.data;
        let layout, template

        const home = (
          <div>
            <Link className='gohome' to={ prefixLink('/') }> All Articles
            </Link>
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
              { home }
              <div>
                <div className='container is-fluid'>
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
            </div>
            );
    }
}

ArticleTemplate.propTypes = {
    route: React.PropTypes.object
}

export default ArticleTemplate;
