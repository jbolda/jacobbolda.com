module.exports = {
  siteMetadata: {
    title: `Blog by Jacob Bolda`,
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
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-responsive-image`,
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
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
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