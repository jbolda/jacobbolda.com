const path = require('path')

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `JSFrontmatter`) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, fieldName: `slug`, fieldValue: slug })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    // const jsBlogPost = path.resolve("src/templates/js-blog-post.js")
    // const markdownBlogPost = path.resolve("src/templates/markdown-blog-post.js")
    // const jsInsetPage = path.resolve("src/templates/js-inset-page.js")
    // const markdownInsetPage = path.resolve("src/templates/markdown-inset-page.js")
    const markdownTemplate = path.resolve("src/templates/markdown.js")
    const jsTemplate = path.resolve("src/templates/javascript.js")

    // Query for all markdown "nodes" and for the slug we previously created.
    resolve(
      graphql(
      `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  layoutType
                  path
                }
                fields {
                  slug
                }
              }
            }
          }
          allJsFrontmatter {
            edges {
              node {
                fileAbsolutePath
                data {
                  layoutType
                  path
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          console.log(result)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
            let frontmatter = edge.node.frontmatter;
            if (frontmatter.layoutType === 'post' ||
                frontmatter.layoutType === 'page') {
                createPage({
                  path: frontmatter.path, // required
                  component: markdownTemplate,
                  context: {
                    layoutType: frontmatter.layoutType,
                    slug: edge.node.fields.slug,
                  },
                })
            }
        })

        // Create blog posts pages.
        result.data.allJsFrontmatter.edges.forEach(edge => {
            let frontmatter = edge.node.data;
            if (frontmatter.layoutType === 'post' ||
                frontmatter.layoutType === 'page') {
                createPage({
                  path: frontmatter.path, // required
                  component: path.resolve(edge.node.fileAbsolutePath),
                  context: {
                    layoutType: frontmatter.layoutType,
                    slug: edge.node.fileAbsolutePath,
                  },
                })
            }
        })

        // console.log(result.data.allFile)
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
