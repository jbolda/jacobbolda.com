module.exports = {
  siteMetadata: {
    siteTitle: `Blog by Jacob Bolda`,
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
    siteAngelList: "https://angel.co/jacobbolda",
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
    `gatsby-transformer-javascript-static-exports`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
            },
          },
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
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss-sass`,
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
  ],
}
