import fs from 'fs'
import path from 'path'
import { minify } from '@putout/minify'

const addClientJs = (eleventyConfig) => {
  const isDevelopment =
    process.env.ELEVENTY_ENV && process.env.ELEVENTY_ENV === 'development'
  const globalJsConfig = fs
    .readFileSync(path.join('./src/_js/global-config.js'), 'utf8')
    .toString()

  eleventyConfig.addFilter('clientJs', (file: string, variables: object) => {
    const script = fs
      .readFileSync(path.join('./src/_js/', file), 'utf8')
      .toString()
    let riverScript = ''
    let isAsync = false
    if (variables && (variables as any).includeRiverJson) {
      riverScript = `const riverGeoJson = await fetch('/assets/river.json').then(r => r.json());`
      isAsync = true
      const { includeRiverJson, ...rest } = variables as any
      variables = rest
    }
    const variablesScript = !variables
      ? ''
      : `const options = ${JSON.stringify(variables)}`
    const wrapper = isAsync ? '(async () => {' : '(() => {'
    const jsScript = `${wrapper}${globalJsConfig}\n${riverScript}\n${variablesScript}\n${script}})()`
    return `<script>${isDevelopment ? jsScript : minify(jsScript)}</script>`
  })
}

export default addClientJs
