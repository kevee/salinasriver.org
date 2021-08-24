const fetch = require('node-fetch')
const fs = require('fs-extra')

const guages = {
  11152300: {
    name: 'chualar',
    label: 'Chualar',
  },
  11150500: {
    name: 'bradley',
    label: 'Bradley Bridge',
  },
  11151700: {
    name: 'soledad',
    label: 'Soledad',
  },
  11147500: { name: 'paso', label: 'Paso Robles' },
  11152500: { name: 'spreckles', label: 'Spreckles' },
}

const run = async () => {
  const results = await fetch(
    `https://waterservices.usgs.gov/nwis/iv/?sites=${Object.keys(guages).join(
      ','
    )}&parameterCd=00060&format=json`
  ).then((response) => response.json())

  const waterLevels = {}
  let highest = 0

  results.value.timeSeries.forEach((item) => {
    if (parseFloat(item.values[0].value[0].value, 10) > highest) {
      highest = parseFloat(item.values[0].value[0].value, 10)
    }
    waterLevels[guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name] =
      {
        cfs: parseFloat(item.values[0].value[0].value, 10),
        id: parseInt(item.sourceInfo.siteCode[0].value, 10),
        name: item.sourceInfo.siteName,
        label: guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].label,
      }
  })
  console.log(
    `Wrote ${guages.length} water guages. Highest guage is ${highest}`
  )
  fs.writeJSONSync('./src/_data/guages.json', waterLevels)
}

run()
