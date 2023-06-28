const gauges = require('./src/data/gauges.json')

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: 'Salinas River Recreation Guide',
    siteUrl: 'https://salinasriver.org',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-usgs-gauges',
      options: {
        gauges,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/access-points',
        name: 'accessPoints',
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.svg',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}
