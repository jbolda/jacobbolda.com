import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';

class MarkdownWrapper extends React.Component {
    render() {
        const { route } = this.props
        const post = route.page.data
console.log('test', this)
        return (
            <div className='markdown'>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
