import fs from 'node:fs'
import path from 'node:path'
import pluginWebc from '@11ty/eleventy-plugin-webc'
import { EleventyI18nPlugin } from '@11ty/eleventy'
import fetchGauges from './src/lib/data/fetch-gauges'
import getDarkVisitorRobots from './src/lib/data/dark-visitor-robots'

const config = async (eleventyConfig: any) => {
  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_components/**/*.webc',
  })

  // Fetch gauge data and store it in a global variable
  eleventyConfig.addGlobalData('gauges', fetchGauges)

  // Fetch dark visitor robots data and store it in a global variable
  eleventyConfig.addGlobalData('darkVisitorRobots', getDarkVisitorRobots)

  // If any guage data's height is greater than the flood level, set isFlooding to true
  eleventyConfig.addGlobalData(
    'eleventyComputed.isFlooding',
    () => (data) =>
      data && data.gauges.some((gauge) => gauge.height >= gauge.flood)
  )
  const translations = {}
  const localesDir = path.join(process.cwd(), 'src', '_data', 'locales')

  // Create locales directory if it doesn't exist
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true })
  }

  // Read all JSON files in the locales directory
  if (fs.existsSync(localesDir)) {
    fs.readdirSync(localesDir).forEach((file) => {
      if (file.endsWith('.json')) {
        const locale = file.replace('.json', '')
        const content = fs.readFileSync(path.join(localesDir, file), 'utf8')
        translations[locale] = JSON.parse(content)
      }
    })
  }

  // Add i18n filter that can be used in WebC components
  eleventyConfig.addFilter('t', function (key, locale) {
    // If no locale is provided, use page locale or default
    locale = locale || this.page?.lang || 'en'

    // Navigate nested keys using dot notation (e.g., "header.title")
    const parts = key.split('.')
    let value = translations[locale]

    for (const part of parts) {
      if (!value || !value[part]) {
        // Fallback to English or return the key itself if not found
        if (locale !== 'en' && translations['en']) {
          let enValue = translations['en']
          for (const p of parts) {
            if (!enValue || !enValue[p]) return key
            enValue = enValue[p]
          }
          return enValue
        }
        return key
      }
      value = value[part]
    }

    return value
  })

  // Configure i18n plugin
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  // Add language path filter for language switching
  eleventyConfig.addFilter('languagePath', function (locale) {
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
