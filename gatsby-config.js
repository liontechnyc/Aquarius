require('dotenv').config()

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-graphql-loader`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["API_URI"]
      }
    },
    {
      resolve: `gatsby-plugin-extract-schema`,
      options: {
        dest: `${__dirname}/src/graphql/schema.json`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `versatiles`,
        short_name: `VersaTiles`,
        start_url: `/`,
        background_color: `#021f36`,
        theme_color: `#ffa800`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Lato`,
            variants: [`400`, `400i`, `500`, `500i`, `600`, `600i`, `700`],
          },
          {
            family: `Roboto`,
            variants: [`400`, `400i`, `500`, `500i`, `600`, `600i`, `700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-XXXXXXXX-X",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },
  ],
};
