const directories = [
  './src/assets/js',
  './src/assets/images',
  {
    './_original': 'original',
  },
  './src/manifest.json',
  './src/robots.txt',
  {
    './node_modules/leaflet/dist': 'assets/js/leaflet',
  },
]

const passThroughCopy = (eleventyConfig) => {
  for (const directory of directories) {
    eleventyConfig.addPassthroughCopy(directory)
  }
}

module.exports = passThroughCopy
