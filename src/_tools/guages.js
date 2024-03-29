const axios = require('axios')
const fs = require('fs-extra')

const guages = {
  11152300: {
    name: 'chualar',
    label: 'Chualar',
    flood: 9,
  },
  11150500: {
    name: 'bradley',
    label: 'Bradley',
    flood: 12,
  },
  11151700: {
    name: 'soledad',
    label: 'Soledad',
    flood: 13,
  },
  11147500: { name: 'paso', label: 'Paso Robles', flood: 18 },
  11152500: { name: 'spreckles', label: 'Spreckles', flood: 15 },
}

const run = async () => {
  const fetchResult = await axios({
    url: `https://waterservices.usgs.gov/nwis/iv/?sites=${Object.keys(
      guages
    ).join(',')}&parameterCd=00060,00065&format=json`,
  })
  const results = fetchResult.data

  const waterLevels = {}
  let highest = 0

  let isFlooding = false

  results.value.timeSeries.forEach((item) => {
    if (parseFloat(item.values[0].value[0].value, 10) > highest) {
      highest = parseFloat(item.values[0].value[0].value, 10)
    }
    if (
      typeof waterLevels[
        guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ] === 'undefined'
    ) {
      waterLevels[
        guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ] = {
        cfs: 0,
        height: 0,
        id: parseInt(item.sourceInfo.siteCode[0].value, 10),
        name: item.sourceInfo.siteName,
        label: guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].label,
      }
    }
    if (item.variable.variableCode[0].value === '00065') {
      waterLevels[
        guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ].height = parseFloat(item.values[0].value[0].value, 10)
    }

    if (item.variable.variableCode[0].value === '00060') {
      waterLevels[
        guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ].cfs = parseFloat(item.values[0].value[0].value, 10)
    }
    if (
      waterLevels[guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name]
        .height >= guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].flood
    ) {
      isFlooding = true
    }
    waterLevels[
      guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
    ].floodLevel = guages[parseInt(item.sourceInfo.siteCode[0].value, 10)].flood
  })
  console.log(
    `Wrote ${
      Object.keys(waterLevels).length
    } water guages. Highest guage is ${highest}`
  )
  fs.writeJSONSync('./src/_data/warning.json', {
    isFlooding,
  })
  fs.writeJSONSync('./src/_data/guages.json', waterLevels)
}

run()
