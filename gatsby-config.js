module.exports = {
  siteMetadata: {
    siteTitle: `Jacob Bolda`,
    siteDescr: `Structural Engineer with a knack for creative solutions with computers, programming and snarky comments.`,
    siteAuthor: `Jacob Bolda`,

    siteEmailUrl: "me@jacobbolda.com",
    siteEmailPretty: "me@jacobbolda.com",
    siteLinkedInUrl: "https://linkedin.com/in/bolda",
    siteLinkedInPretty: "linkedin.com/in/bolda",
    siteTwitterUrl: "https://twitter.com/jacob_bolda",
    siteTwitterPretty: "@jacob_bolda",
    siteGithubUrl: "https://github.com/jbolda",
    siteGithubPretty: "github.com/jbolda",
    siteAngelListUrl: "https://angel.co/jacobbolda",
    siteAngelListPretty: "angel.co/jacobbolda",
    siteKeybaseUrl: "https://keybase.io/jbolda",
    siteKeybasePretty: "keybase.io/jbolda",
    sitePhotoUrl: "http://www.jbolda.com/photo",
    sitePhotoPretty: "My Photographs",
  },
  plugins: [
   {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/mainPages/`,
      },
    },
   {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static`,
        path: `${__dirname}/src/static/`,
      },
    },
    `gatsby-transformer-javascript-static-exports`,
    {
      resolve: `gatsby-source-airtable-linked`,
      options: {
        tables: [
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Recipes`,
            tableView: `List`,
            queryName: `Recipes`,
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
            options: {},
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    // `gatsby-theme-bulma`,
    `gatsby-plugin-sass`, // imported for gatsby-theme-bulma
    // `gatsby-theme-bulma-layout`,
    // `gatsby-theme-bulma-blog`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JacobBolda.com`,
        short_name: `Bolda`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#191919`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`, // make sure to put at the end of the array
  ],
}
