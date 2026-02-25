/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
import 'dotenv/config'
import { marked } from 'marked'
import './src/_lib/i18n/init'
import addGlobalData from './src/_lib/data'
import addI18nFilters from './src/_lib/i18n/filters'
import addWebc from './src/_lib/webc'
import addClientJs from './src/_lib/client-js'
import addMinifyHtml from './src/_lib/minify-html'
import staticMaps from './src/_lib/data/static-maps'
import processPhotos from './src/_lib/data/process-photos'
import processDetections from './src/_lib/data/process-detections'

const config = async (eleventyConfig: any) => {
  await processPhotos(eleventyConfig)
  await processDetections(eleventyConfig)
  await addGlobalData(eleventyConfig)
  addI18nFilters(eleventyConfig)
  addWebc(eleventyConfig)
  addClientJs(eleventyConfig)
  addMinifyHtml(eleventyConfig)
  await staticMaps(eleventyConfig)

  eleventyConfig.addWatchTarget('./src/_js/*.js')
  eleventyConfig.addWatchTarget('./src/_lib/*.ts')

  eleventyConfig.addPassthroughCopy({
    'node_modules/leaflet/dist/leaflet-global.js':
      '/assets/leaflet/leaflet-global.js',
    'node_modules/leaflet/dist/leaflet.css': '/assets/leaflet/leaflet.css',
  })

  // @danger remove
  eleventyConfig.addFilter('debug', function (value) {
    return JSON.stringify(value, null, 2)
  })

  // Add a filter to convert markdown content to HTML
  eleventyConfig.addFilter('markdown', (content: string) =>
    content ? marked.parse(content) : ''
  )

  // Create a redirect from / to /en/
  eleventyConfig.addPassthroughCopy({
    'src/redirect.html': 'index.html',
  })

  eleventyConfig.addPassthroughCopy({
    'src/assets': 'assets',
  })

  eleventyConfig.addPassthroughCopy({
    'src/sw.js': 'sw.js',
  })

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}

export default config
