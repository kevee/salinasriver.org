require('dotenv').config()
const jsYaml = require('js-yaml')
const fs = require('fs-extra')
const glob = require('glob')
const axios = require('axios')

const downloadImage = (url, path) => {
  return axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(path))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e))
      })
  )
}

const downloadImages = async (parts) => {
  parts.forEach(async (part) => {
    console.log(`Downloading ${part.imagePath}`)
    await downloadImage(
      `https://maps.googleapis.com/maps/api/staticmap?size=512x512&zoom=19&maptype=hybrid&center=${part.part.lat},${part.part.lon}&markers=|color:blue|${part.part.lat},${part.part.lon}&key=${process.env.GOOGLE_API_KEY}`,
      part.imagePath
    )
  })
}

glob('./src/en/trips/**.md', {}, (er, files) => {
  const toDownload = []

  files.forEach((file) => {
    const trip = jsYaml.loadAll(fs.readFileSync(file).toString())
    const filename = file.split('/').pop().replace('.md', '')
    if (typeof trip[0].parts !== 'undefined' && trip[0].parts.length) {
      trip[0].parts.forEach((part) => {
        const imagePath = `./src/assets/images/static-maps/${filename}--${part.id}.jpg`
        if (!fs.existsSync(imagePath)) {
          toDownload.push({
            filename,
            imagePath,
            part,
          })
        }
      })
    }
    downloadImages(toDownload)
  })
})
