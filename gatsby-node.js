// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage, createRedirect } = actions;

//   return createPage({
//     path: "test-social-image",
//     component: require.resolve("./src/articles/social-image.js")
//   });

// // Create from markdown
// result.data.allMarkdownRemark.edges.forEach(edge => {
//   let frontmatter = edge.node.frontmatter;
//   if (frontmatter.layoutType === `page`) {
//     createPage({
//       path: frontmatter.path, // required
//       component: mdSimplePage,
//       context: {
//         slug: edge.node.fields.slug
//       }
//     });
//   }
// });
// };
