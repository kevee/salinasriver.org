const markdownIt = require('markdown-it')

const md = new markdownIt({
  html: true,
})

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/sass/')
  eleventyConfig.addPassthroughCopy('./src/assets')

  eleventyConfig.addFilter('markdown', (content) => {
    return md.render(content)
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

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  }
}
