import axios from 'axios'
import fs from 'fs'

const staticMaps = async (eleventyConfig) => {
  eleventyConfig.addGlobalData(
    'eleventyComputed.staticMaps',
    () => async (data) => {
      for (const trip of Object.values(data.trips)) {
        for (const part of trip.parts) {
          const imagePath = `./src/assets/images/static-maps/${trip.slug}--${part.id}.jpg`
          if (!fs.existsSync(imagePath)) {
            axios({
              url: `https://maps.googleapis.com/maps/api/staticmap?size=512x512&zoom=19&maptype=hybrid&center=${part.lat},${part.lon}&markers=|color:red|${part.lat},${part.lon}&key=${process.env.GOOGLE_API_KEY}`,
              responseType: 'stream',
            }).then(
              (response) =>
                new Promise((resolve, reject) => {
                  response.data
                    .pipe(fs.createWriteStream(imagePath))
                    .on('finish', () => resolve(imagePath))
                    .on('error', (e) => reject(e))
                })
            )
          }
        }
      }
    }
  )
}

export default staticMaps
