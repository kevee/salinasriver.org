const fetch = require('node-fetch')
const fs = require('fs-extra')

const guages = {
  11152300: 'chualar',
  11150500: 'bradley',
  11151700: 'soledad',
  11147500: 'paso',
  11152500: 'spreckles',
}

const run = async () => {
  const results = await fetch(
    `https://waterservices.usgs.gov/nwis/iv/?sites=${Object.keys(guages).join(
      ','
    )}&parameterCd=00060&format=json`
  ).then((response) => response.json())

  const waterLevels = {}

  results.value.timeSeries.forEach((item) => {
    waterLevels[guages[parseInt(item.sourceInfo.siteCode[0].value, 10)]] = {
      cfs: parseFloat(item.values[0].value[0].value, 10),
      id: parseInt(item.sourceInfo.siteCode[0].value, 10),
      name: item.sourceInfo.siteName,
    }
  })
  fs.writeJSONSync('./_data/guages.json', waterLevels)
}

run()
