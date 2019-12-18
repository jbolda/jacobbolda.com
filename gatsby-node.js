// exports.createPages = ({ graphql, actions }) => {
//   const { createPage, createRedirect } = actions;

//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(
//         `
//           {
//           }
//         `
//       ).then(result => {
//         if (result.errors) {
//           result.errors.forEach(error => {
//             console.log(error);
//           });

//           reject(result.errors);
//         }

//         Create from markdown
//         result.data.allMarkdownRemark.edges.forEach(edge => {
//           let frontmatter = edge.node.frontmatter;
//           if (frontmatter.layoutType === `page`) {
//             createPage({
//               path: frontmatter.path, // required
//               component: mdSimplePage,
//               context: {
//                 slug: edge.node.fields.slug
//               }
//             });
//           }
//         });

//         return;
//       })
//     );
//   });
// };
