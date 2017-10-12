import React from "react"
import Helmet from "react-helmet"

class PostPublished extends React.Component {
  render() {
    console.log(this)
    const frontmatter = this

    if (frontmatter.updated === null) {
      var published = (
        <div className="date-published">
          <p>
            <em>
              published {frontmatter.written}
            </em>
          </p>
        </div>
      )
    } else {
      var published = (
        <div className="date-published">
          <p>
            <em>
              originally published{` `}
              {frontmatter.written} and updated{` `}
              {frontmatter.updated}
            </em>
          </p>
        </div>
      )
    }

    return <div className="container content">{published}</div>
  }
}

export default PostPublished
