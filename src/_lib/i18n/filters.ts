import {
  EleventyI18nPlugin,
  InputPathToUrlTransformPlugin,
} from '@11ty/eleventy'
import i18next from 'i18next'

const addI18nFilters = (eleventyConfig) => {
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin)
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'en',
  })

  // Add i18n filter that can be used in WebC components
  eleventyConfig.addFilter('t', function (key) {
    const locale = this.page?.lang || 'en'

    i18next.changeLanguage(locale)
    return i18next.t(key)
  })

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

  eleventyConfig.addFilter('formatDate', function (dateStr: string) {
    const locale = this.page?.lang || 'en'
    const date = new Date(dateStr + 'T00:00:00')
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
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
}

export default addI18nFilters
