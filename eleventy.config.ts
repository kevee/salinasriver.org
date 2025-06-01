/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
import pluginWebc from '@11ty/eleventy-plugin-webc'
import {
  EleventyI18nPlugin,
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy'
import sass from 'sass'
import CleanCSS from 'clean-css'
import i18next from 'i18next'
import { marked } from 'marked'
import path from 'path'
import fs from 'fs'
import './src/_lib/i18n'
import getTypography from './src/_lib/get-typography'
import fetchGauges from './src/_lib/data/fetch-gauges'
import getDarkVisitorRobots from './src/_lib/data/dark-visitor-robots'
import type { GaugeWithMeasurements } from './src/_lib/data/fetch-gauges'

interface AccessPoint {
  latitude: number
  [key: string]: any
}

const config = async (eleventyConfig: any) => {
  const gauges = await fetchGauges()

  eleventyConfig.addWatchTarget('./src/_js/*.js')

  eleventyConfig.addPassthroughCopy({
    'node_modules/leaflet/dist/leaflet-global.js':
      '/assets/leaflet/leaflet-global.js',
    'node_modules/leaflet/dist/leaflet.css': '/assets/leaflet/leaflet.css',
  })

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)

  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_components/**/*.webc',
    bundlePluginOptions: {
      transforms: [
        function (content: string) {
          if (!this.type.includes('css')) {
            return content
          }
          const { fontImport, typography } = getTypography()
          const compiledSass = sass.compileString(content)
          const result = new CleanCSS().minify(compiledSass.css)
          if (this.buckets.includes('default')) {
            return [fontImport, typography, result.styles].join('')
          }
          return result.styles
        },
      ],
    },
  })

  // Fetch gauge data and store it in a global variable
  eleventyConfig.addGlobalData('gauges', gauges)

  // Fetch dark visitor robots data and store it in a global variable
  eleventyConfig.addGlobalData('darkVisitorRobots', getDarkVisitorRobots)

  // If any guage data's height is greater than the flood level, set isFlooding to true
  eleventyConfig.addGlobalData(
    'eleventyComputed.isFlooding',
    () => (data) =>
      data && data.gauges.some((gauge) => gauge.height >= gauge.flood)
  )

  eleventyConfig.addGlobalData(
    'eleventyComputed.accessPointsSortLatitude',
    () => (data) => {
      if (!data || !data.accessPoints) {
        return []
      }
      return Object.values(
        data.accessPoints as Record<string, AccessPoint>
      ).sort((a: AccessPoint, b: AccessPoint) => a.latitude - b.latitude)
    }
  )

  eleventyConfig.addGlobalData(
    'eleventyComputed.tripsSortLatitude',
    () => (data) => {
      if (!data || !data.trips) {
        return []
      }
      return Object.values(data.trips as Record<string, AccessPoint>).sort(
        (a: AccessPoint, b: AccessPoint) => a.latitude - b.latitude
      )
    }
  )

  eleventyConfig.addFilter('gauge', (gaugeName: string, attribute: string) => {
    const gauge = gauges.find(
      (g: GaugeWithMeasurements) => g.name === gaugeName
    )
    if (!gauge) {
      return null
    }
    if (attribute === 'url') {
      return `https://waterdata.usgs.gov/monitoring-location/${gauge?.id}`
    }
    return gauge?.[attribute]
  })

  // @danger remove
  eleventyConfig.addFilter('debug', function (value) {
    return JSON.stringify(value, null, 2)
  })

  // Add i18n filter that can be used in WebC components
  eleventyConfig.addFilter('t', function (key) {
    const locale = this.page?.lang || 'en'

    i18next.changeLanguage(locale)
    return i18next.t(key)
  })

  // Configure i18n plugin
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  eleventyConfig.addFilter('clientJs', (file: string, variables: object) => {
    const script = fs
      .readFileSync(path.join('./src/_js/', file), 'utf8')
      .toString()
    const variablesScript = !variables
      ? ''
      : `const options = ${JSON.stringify(variables)}`
    return `<script>(() => {${variablesScript}\n${script}})()</script>`
  })

  // Add a filter to convert markdown content to HTML
  eleventyConfig.addFilter('markdown', (content: string) =>
    marked.parse(content)
  )

  // Filter to transform input paths to URLs
  eleventyConfig.addFilter('u', function (path) {
    const locale = this.page?.lang || 'en'
    return `/${locale}${path}`
  })

  // Filter to get the current value of a key in the current language
  eleventyConfig.addFilter('l', function (object, value) {
    const locale = this.page?.lang || 'en'
    return object[locale][value]
  })

  // Add language path filter for language switching
  eleventyConfig.addFilter('switchLanguagePath', function (locale) {
    if (!this.page || !this.page.url) return `/${locale}/`

    // Get the current path without the language prefix
    let currentPath = this.page.url
    const pathParts = currentPath.split('/').filter(Boolean)

    // Remove the current language prefix if it exists
    if (pathParts.length > 0 && ['en', 'es'].includes(pathParts[0])) {
      pathParts.shift()
    }

    return `/${this.page.lang === 'en' ? 'es' : 'en'}/${pathParts.join('/')}`
  })

  // Create a redirect from / to /en/
  eleventyConfig.addPassthroughCopy({
    'src/redirect.html': 'index.html',
  })

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}

export default config
