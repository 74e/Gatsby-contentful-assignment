/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `PortfolioLabb2`,
    siteUrl: `https://delicate-granita-cec294.netlify.app/`,
    menuLinks: [
      { endpoint: "/", name: "Home" },
      { endpoint: "/portfolio", name: "Portfolio" },
      { endpoint: "/about", name: "About" },
      { endpoint: "/contact", name: "Contact" },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://delicate-granita-cec294.netlify.app/",
        sitemap: "https://delicate-granita-cec294.netlify.app/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
