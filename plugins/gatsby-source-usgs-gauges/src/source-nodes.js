import fetch from 'node-fetch'

export const sourceNodes = async (
  { actions, reporter, createNodeId, createContentDigest },
  configOptions
) => {
  const { gauges } = configOptions
  reporter.info(`Fetching data from ${Object.keys(gauges).length} gauges`)

  const gaugeData = await fetch(
    `https://waterservices.usgs.gov/nwis/iv/?sites=${Object.keys(gauges).join(
      ','
    )}&parameterCd=00060,00065&format=json`
  ).then((res) => res.json())

  const waterLevels = {}
  let isFlooding = false

  for (const item of gaugeData.value.timeSeries) {
    if (
      typeof waterLevels[
        gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ] === 'undefined'
    ) {
      waterLevels[
        gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ] = {
        cfs: 0,
        height: 0,
        id: parseInt(item.sourceInfo.siteCode[0].value, 10),
        name: item.sourceInfo.siteName,
        label: gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].label,
      }
    }
    if (item.variable.variableCode[0].value === '00065') {
      waterLevels[
        gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ].height = parseFloat(item.values[0].value[0].value, 10)
    }

    if (item.variable.variableCode[0].value === '00060') {
      waterLevels[
        gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
      ].cfs = parseFloat(item.values[0].value[0].value, 10)
    }
    if (
      waterLevels[gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name]
        .height >= gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].flood
    ) {
      isFlooding = true
    }
    waterLevels[
      gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].name
    ].floodLevel = gauges[parseInt(item.sourceInfo.siteCode[0].value, 10)].flood
  }

  for (const [name, waterLevel] of Object.entries(waterLevels)) {
    const node = {
      waterLevel,
      name,
      id: createNodeId(`waterLevel-${name}`),
      parent: null,
      children: [],
      internal: {
        type: 'waterLevel',
        contentDigest: createContentDigest(waterLevel),
      },
    }
    actions.createNode(node)
  }
  actions.createNode({
    isFlooding,
    id: createNodeId(`isFlooding-${isFlooding}`),
    parent: null,
    children: [],
    internal: {
      type: 'isFlooding',
      contentDigest: createContentDigest(`isFlooding-${isFlooding}`),
    },
  })
}
