import pluginWebc from '@11ty/eleventy-plugin-webc'
import * as sass from 'sass'
import CleanCSS from 'clean-css'
import getTypography from './get-typography'

const addWebc = (eleventyConfig) => {
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
}

export default addWebc
