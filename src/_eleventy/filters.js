const mdReplaceLink = require('markdown-it-replace-link')
const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')

const md = new markdownIt({
  html: true,
})

const filters = (eleventyConfig) => {
  eleventyConfig.amendLibrary('md', (mdLib) =>
    mdLib.use(mdReplaceLink, {
      replaceLink: (link, env) => {
        if (['/en', '/es'].includes(link)) {
          return link
        }
        if (link.startsWith('/')) {
          return `/${env.page.lang}${link}`
        }
        return link
      },
    })
  )

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

  eleventyConfig.addFilter('switchUrlLanguage', (url) => {
    if (url.includes('/en/')) {
      return url.replace('/en/', '/es/')
    }
    return url.replace('/es/', '/en/')
  })

  eleventyConfig.addFilter('accessPointsJson', ({ points, geo, lang }) => {
    return JSON.stringify(
      points
        .filter((point) => point.page.lang === lang)
        .map((point) => ({
          title: point.data.title,
          lat: geo[point.fileSlug].lat,
          lon: geo[point.fileSlug].lon,
          url: `/access-points/${point.fileSlug}`,
        }))
    )
  })

  eleventyConfig.addFilter('tripsJson', ({ trips, geo, lang }) => {
    return JSON.stringify(
      trips
        .filter((trip) => trip.page.lang === lang)
        .map((trip) => ({
          title: trip.data.title,
          lat: geo[trip.fileSlug].lat,
          lon: geo[trip.fileSlug].lon,
          length: trip.data.length,
          url: `/trips/${trip.fileSlug}`,
        }))
    )
  })
}

module.exports = filters
