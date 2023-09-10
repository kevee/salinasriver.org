require('dotenv').config()
const { EleventyI18nPlugin } = require('@11ty/eleventy')
const faviconPlugin = require('eleventy-favicon')
const eleventySass = require('eleventy-sass')
const i18n = require('eleventy-plugin-i18n')
const translations = require('./src/_data/i18n')

const passThroughCopy = require('./src/_eleventy/pass-through-copy')
const filters = require('./src/_eleventy/filters')
const shortcodes = require('./src/_eleventy/shortcodes')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en',
    },
  })

  eleventyConfig.addPlugin(eleventySass)
  eleventyConfig.addPlugin(faviconPlugin, { destination: './public' })

  eleventyConfig.addWatchTarget('./src/sass/')

  passThroughCopy(eleventyConfig)
  filters(eleventyConfig)
  shortcodes(eleventyConfig)

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
