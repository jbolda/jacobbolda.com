const path = require('path')

exports.onNodeCreate = ({ node, boundActionCreators, getNode }) => {
  const { updateNode } = boundActionCreators
  let slug
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Set the slug on the node and save the change.
    node.slug = slug
    updateNode(node)
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { upsertPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("src/templates/blog-post.js")
    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                slug
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          upsertPage({
            path: edge.node.slug, // required
            component: blogPost,
            context: {
              slug: edge.node.slug,
            },
          })
        })

        return
      })
    )
  })
}

// var cssnext = require('postcss-cssnext');
// var CopyWebpackPlugin = require('copy-webpack-plugin');

// var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

// exports.modifyWebpackConfig = function(config, env) {
//     config.merge({
//         postcss: [
//             cssnext({
//                 browsers: ['>1%', 'last 2 versions']
//             })
//         ]
//     })

//     config.plugin(
//             'CopyWebpackPlugin',
//             CopyWebpackPlugin,
//             [
//                 [
//                     { from: '../static/images/logo/favicon.ico', to: '' }
//                 ],
//                 {
//                     ignore: [
//                     'ignore.txt'
//                     ],
//                     debug: 'warning'
//                 }
//             ]
//     )

//     config.loader('svg', {
//        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//        loader: 'file-loader',
//     })


//     config.loader('geojson', {
//        test: /\.(geojson)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//        loader: 'json-loader',
//     })

//     return config
// };
