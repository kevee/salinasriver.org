import posthtml from 'posthtml'
import htmlmin from 'html-minifier'
// @ts-expect-error
import minify from 'posthtml-minify-classnames'

const addMinifyHtml = (eleventyConfig) => {
  const isDevelopment =
    process.env.ELEVENTY_ENV && process.env.ELEVENTY_ENV === 'development'

  eleventyConfig.addTransform('minifyHtml', async (content, outputPath) => {
    if (!isDevelopment && outputPath && outputPath.endsWith('.html')) {
      const minifiedContent = await posthtml()
        .use(
          minify({
            genNameId: false,
          })
        )
        .process(content, { sync: true })

      return htmlmin.minify(minifiedContent.html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
      })
    }
    return content
  })
}

export default addMinifyHtml
