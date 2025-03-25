const axios = require('axios')
const sharp = require('sharp')
const fs = require('fs-extra')
const { DateTime } = require('luxon')

;(async () => {
  try {
    const { data } = await axios.get(
      'https://jj5utwupk5.execute-api.us-east-1.amazonaws.com/prod/listFiles?camId=CA_SALINAS_R_NR_BRADLEY_CA&limit=5'
    )
    const lastImageUrl = `https://usgs-nims-images.s3.amazonaws.com/overlay/CA_SALINAS_R_NR_BRADLEY_CA/${data[0]}`

    // Extract and process the date from the image name
    const imageName = data[0]
    const utcDate = imageName
      .split('___')[1]
      .replace('.jpg', '')
      .replace(/T(\d+)-(\d+)-(\d+)/, 'T$1:$2:$3')
    const localDate = DateTime.fromISO(utcDate)
      .setZone('America/Los_Angeles')
      .toLocaleString(DateTime.DATETIME_FULL)

    // Save the date to a JSON file
    const dateOutputPath = './src/_data/lastImage.json'
    await fs.outputJson(dateOutputPath, { lastImageDate: localDate })

    // Download the image
    const response = await axios({
      url: lastImageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    })

    // Resize the image to 900px wide and save it
    const outputPath = './src/assets/images/latest-camera.jpg'
    await sharp(response.data).resize({ width: 900 }).toFile(outputPath)

    console.log(`Image saved to ${outputPath}`)
    console.log(`Date saved to ${dateOutputPath}`)
  } catch (error) {
    console.error('Error processing the image:', error)
  }
})()
