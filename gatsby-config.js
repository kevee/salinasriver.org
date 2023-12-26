const gauges = require('./src/data/gauges.json')
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
    'gatsby-transformer-remark',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-meta-redirect',
    {
      resolve: 'gatsby-source-usgs-gauges',
      options: {
        gauges,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/content',
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/dam-release/schedule.yaml',
        name: 'damReleaseSchedule',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/trips',
        name: 'trips',
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
