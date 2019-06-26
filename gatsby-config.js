module.exports = {
  siteMetadata: {
    siteTitle: `Jacob Bolda`,
    siteDescription: `Structural Engineer with a knack for creative solutions using code and ingenuity.`,
    siteAuthor: `Jacob Bolda`,
    siteAuthorIdentity: `Structural Engineer`,
    siteLanding: `
      Focusing on the intersection of tech and Structural
      Engineering. Masters degree in Structural Engineering
      from the Milwaukee School of Engineering, undergrad in
      Architectural Engineering with a minor in Management,
      and a deep understanding of software and programming.
      Marrying that experience with problem solving and
      systematizing is powerful.
    `,
    siteContact: "https://twitter.com/jacobbolda",
    contactLinks: [
      { url: "mailto:me@jacobbolda.com", text: "me@jacobbolda.com", icon: ["far", "envelope"] },
      { url: "https://twitter.com/jacobbolda", text: "@jacobbolda", icon: ["fab", "twitter"] },
      { url: "https://linkedin.com/in/bolda", text: "linkedin.com/in/bolda", icon: ["fab","linkedin"] },
      { url: "https://github.com/jbolda", text: "github.com/jbolda", icon: ["fab", "github"] },
      { url: "https://keybase.io/jbolda", text: "keybase.io/jbolda", icon: ["fab", "keybase"] },
      { url: "https://angel.co/jacobbolda", text: "angel.co/jacobbolda", icon: ["fab", "angellist"] },
      { url: "http://www.jbolda.com/photo", text: "My Photographs", icon: ["fas", "camera"] }
    ],
    navLinks: [
      {url: '/recipes/', text: 'Our Recipes'}
    ]
  },
  __experimentalThemes: [
    {
      resolve: `gatsby-theme-bulma-core`,
      options: {
        root: __dirname
      }
    },
    {
      resolve: `gatsby-theme-bulma-layout`,
      options: {
        root: __dirname
      }
    },
    {
      resolve: `gatsby-theme-bulma-homepage`,
      options: {
        root: __dirname
      }
    },
    {
      resolve: `gatsby-theme-bulma-blog`,
      options: {
        root: __dirname,
        showArticlesOnHomepage: false
      }
    }
  ],
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `main`,
        path: `${__dirname}/src/main/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles/`
      }
    },
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-airtable`,
      apiKey: process.env.AIRTABLE_API_KEY,
      options: {
        tables: [
          {
            baseId: `appcL6Jdj7ZrhTg4q`,
            tableName: `Recipes`,
            tableView: `List`,
            queryName: `Recipes`,
            mapping: { Attachments: `fileNode` },
            tableLinks: [`Cooking_Method`, `Style`]
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
        icon: "src/assets/avatar.png"
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify` // make sure to put at the end of the array
  ]
};
