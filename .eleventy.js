require('dotenv').config()
const markdownIt = require('markdown-it')
const { EleventyI18nPlugin } = require('@11ty/eleventy')
const { DateTime } = require('luxon')
const htmlmin = require('html-minifier')
const faviconPlugin = require('eleventy-favicon')
const eleventySass = require('eleventy-sass')
const translations = require('./src/_data/i18n')

const md = new markdownIt({
  html: true,
})

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  eleventyConfig.addPlugin(eleventySass)
  eleventyConfig.addWatchTarget('./src/sass/')
  eleventyConfig.addPlugin(faviconPlugin, { destination: './public' })
  eleventyConfig.addPassthroughCopy('./src/assets/js')
  eleventyConfig.addPassthroughCopy('./src/assets/images')
  eleventyConfig.addPassthroughCopy('./src/_redirects')
  eleventyConfig.addPassthroughCopy({
    './_original': 'original',
  })
  eleventyConfig.addPassthroughCopy('./src/manifest.json')
  eleventyConfig.addPassthroughCopy('./src/robots.txt')
  eleventyConfig.addPassthroughCopy({
    './node_modules/leaflet/dist': 'assets/js/leaflet',
  })

  if (typeof process.env.SALINAS_RIVER_LOCAL === 'undefined') {
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        })
        return minified
      }

      return content
    })
  }

  eleventyConfig.addFilter('markdown', (content) => {
    return md.render(content)
  })

  eleventyConfig.addFilter('json', (content) => {
    return JSON.stringify(content)
  })

  eleventyConfig.addFilter('accessPointsJson', (points) => {
    return JSON.stringify(
      points.map((point) => ({
        title: point.data.title,
        lat: point.data.lat,
        lon: point.data.lon,
        url: `/access-points/${point.fileSlug}`,
      }))
    )
  })

  eleventyConfig.addFilter('tripsJson', (trips) => {
    return JSON.stringify(
      trips.map((trip) => ({
        title: trip.data.title,
        lat: trip.data.lat,
        lon: trip.data.lon,
        length: trip.data.length,
        url: `/trips/${trip.fileSlug}`,
      }))
    )
  })

  eleventyConfig.on('afterBuild', () => {
    console.log(eleventyConfig.collections)
  })

  eleventyConfig.addShortcode(
    'buildDate',
    () =>
      `${DateTime.now().toLocaleString(DateTime.DATE_FULL)} at ${DateTime.now()
        .toLocaleString(DateTime.TIME_SIMPLE)
        .toLowerCase()}`
  )

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
