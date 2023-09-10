const { DateTime } = require('luxon')

const shortcodes = (eleventyConfig) => {
  eleventyConfig.addShortcode(
    'buildDate',
    () =>
      `${DateTime.now().toLocaleString(DateTime.DATE_FULL)} at ${DateTime.now()
        .toLocaleString(DateTime.TIME_SIMPLE)
        .toLowerCase()}`
  )
}

module.exports = shortcodes
