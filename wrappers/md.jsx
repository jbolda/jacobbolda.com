import React from 'react';
import { config } from 'config';

class MarkdownWrapper extends React.Component {
    render() {
        const { route } = this.props
        const post = route.page.data

        return (
            <div className='markdown section'>
              <div className='container content'>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            </div>
            );
    }
}

MarkdownWrapper.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default MarkdownWrapper;
