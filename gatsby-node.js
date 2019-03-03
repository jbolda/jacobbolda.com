const path = require(`path`);

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode } = actions;
  const fileNode = getNode(node.parent);

  let slug;
  if (
    node.internal.type === `MarkdownRemark` ||
    node.internal.type === `JavascriptFrontmatter`
  ) {
    try {
      const parsedFilePath = path.parse(fileNode.relativePath);
      if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
      } else if (parsedFilePath.dir === ``) {
        slug = `/${parsedFilePath.name}/`;
      } else {
        slug = `/${parsedFilePath.dir}/`;
      }

      // Add slug as a field on the node.
      createNodeField({ node, name: `slug`, value: slug });
    } catch (error) {
      // nil
    }
  }

  if (node.internal.type === `Airtable` && node.table === `Recipes`) {
    slug = `/${node.data.Name.replace(/ /g, "-")
      .replace(/[,&]/g, "")
      .toLowerCase()}/`;

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const pages = [];
    const mdSimplePage = path.resolve(`src/templates/mdSimplePage.js`);
    const atRecipes = path.resolve(`src/templates/SimpleRecipeTemplate.js`);

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
            allJavascriptFrontmatter {
              edges {
                node {
                  fileAbsolutePath
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
            allAirtable(filter: { table: { eq: "Recipes" } }) {
              edges {
                node {
                  id
                  data {
                    Name
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
          result.errors.forEach(error => {
            console.log(error);
          });

          reject(result.errors);
        }

        // Create from markdown
        result.data.allMarkdownRemark.edges.forEach(edge => {
          let frontmatter = edge.node.frontmatter;
          if (frontmatter.layoutType === `page`) {
            createPage({
              path: frontmatter.path, // required
              component: mdSimplePage,
              context: {
                slug: edge.node.fields.slug
              }
            });
          }
        });

        // Create pages from javascript
        // Gatsby will, by default, createPages for javascript in the
        //  /pages directory. We purposely don't have a folder with this name
        //  so that we can go full manual mode.
        result.data.allJavascriptFrontmatter.edges.forEach(edge => {
          let frontmatter = edge.node.frontmatter;
          // see above
          if (frontmatter.layoutType === `post`) {
            createPage({
              path: frontmatter.path, // required
              component: path.resolve(edge.node.fileAbsolutePath),
              context: {
                slug: edge.node.fields.slug
              }
            });
          } else if (frontmatter.layoutType === `page`) {
            createPage({
              path: frontmatter.path, // required
              component: path.resolve(edge.node.fileAbsolutePath),
              context: {
                slug: edge.node.fields.slug
              }
            });
          } else if (edge.node.fields.slug === `/index/`) {
            createPage({
              path: `/`, // required, we don't have frontmatter for this page hence separate if()
              component: path.resolve(edge.node.fileAbsolutePath),
              context: {
                slug: edge.node.fields.slug
              }
            });
          }
        });

        result.data.allAirtable.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug, // required, we don't have frontmatter for this page hence separate if()
            component: atRecipes,
            context: {
              name: edge.node.data.Name
            }
          });
        });

        createRedirect({
          fromPath: "/contact/",
          toPath: "/",
          isPermanent: true
        });
        createRedirect({ fromPath: "/about/", toPath: "/", isPermanent: true });

        return;
      })
    );
  });
};
