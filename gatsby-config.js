module.exports = {
  siteMetadata: {
    siteTitle: `Jacob Bolda`,
    siteDescription: `Structural Engineer with a knack for creative solutions using code and ingenuity.`,
    siteAuthor: `Jacob Bolda`,

    siteEmailUrl: "me@jacobbolda.com",
    siteEmailPretty: "me@jacobbolda.com",
    siteLinkedInUrl: "https://linkedin.com/in/bolda",
    siteLinkedInPretty: "linkedin.com/in/bolda",
    siteTwitterUrl: "https://twitter.com/jacobbolda",
    siteTwitterPretty: "@jacobbolda",
    siteGithubUrl: "https://github.com/jbolda",
    siteGithubPretty: "github.com/jbolda",
    siteAngelListUrl: "https://angel.co/jacobbolda",
    siteAngelListPretty: "angel.co/jacobbolda",
    siteKeybaseUrl: "https://keybase.io/jbolda",
    siteKeybasePretty: "keybase.io/jbolda",
    sitePhotoUrl: "http://www.jbolda.com/photo",
    sitePhotoPretty: "My Photographs"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/mainPages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/src/static/`
      }
    },
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        tables: [
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Recipes`,
            tableView: `List`,
            queryName: `Recipes`,
            mapping: { Attachments: `fileNode` },
            tableLinks: [`Cooking Method`, `Style`]
          },
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Cooking Method`,
            tableView: `Main View`,
            queryName: `Cooking Method`,
            tableLinks: [`Recipes`]
          },
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Style`,
            tableView: `Main View`,
            queryName: `Style`,
            tableLinks: [`Recipes`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {}
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    // `gatsby-theme-bulma`,
    `gatsby-plugin-sass`, // imported for gatsby-theme-bulma
    // `gatsby-theme-bulma-layout`,
    // `gatsby-theme-bulma-blog`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-5BSQFD",
        includeInDevelopment: false
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
      }
    },
    `gatsby-transformer-screenshot`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JacobBolda.com`,
        short_name: `Bolda`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#191919`,
        display: `minimal-ui`,
        icon: "src/static/assets/avatar.png"
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify` // make sure to put at the end of the array
  ]
};
