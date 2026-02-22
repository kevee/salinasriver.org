import fetchGauges from './fetch-gauges'
import fetchLagoonGauge from './fetch-lagoon-gauge'
import getDarkVisitorRobots from './dark-visitor-robots'
import type { GaugeWithMeasurements } from './fetch-gauges'

interface AccessPoint {
  lat: number
  [key: string]: any
}

const addGlobalData = async (eleventyConfig) => {
  const gauges = await fetchGauges()
  // Fetch gauge data and store it in a global variable
  eleventyConfig.addGlobalData('gauges', gauges)

  //eleventyConfig.addGlobalData('lagoonGaugeHeight', fetchLagoonGauge)

  // Fetch dark visitor robots data and store it in a global variable
  eleventyConfig.addGlobalData('darkVisitorRobots', getDarkVisitorRobots)

  // If any guage data's height is greater than the flood level, set isFlooding to true
  eleventyConfig.addGlobalData(
    'eleventyComputed.isFlooding',
    () => (data) =>
      data && data.gauges.some((gauge) => gauge.height >= gauge.flood),
  )

  eleventyConfig.addGlobalData(
    'eleventyComputed.accessPointsSortLatitude',
    () => (data) => {
      if (!data || !data.accessPoints) {
        console.log('POINT FAILED')
        return []
      }
      return Object.values(
        data.accessPoints as Record<string, AccessPoint>,
      ).sort((a: AccessPoint, b: AccessPoint) => a.lat - b.lat)
    },
  )

  eleventyConfig.addGlobalData(
    'eleventyComputed.tripsSortLatitude',
    () => (data) => {
      if (!data || !data.trips) {
        return []
      }
      return Object.values(data.trips as Record<string, AccessPoint>).sort(
        (a: AccessPoint, b: AccessPoint) => a.lat - b.lat,
      )
    },
  )

  eleventyConfig.addFilter(
    'flowStatus',
    (gaugeName: string, flowLow: number, flowHigh: number) => {
      const gauge = gauges.find(
        (g: GaugeWithMeasurements) => g.name === gaugeName,
      )
      if (!gauge || gauge.cfs == null) return null
      const cfs = gauge.cfs
      if (cfs <= 0) return 'none'
      if (cfs < flowLow) return 'below'
      if (cfs > flowHigh) return 'above'
      return 'good'
    },
  )

  eleventyConfig.addFilter('gauge', (gaugeName: string, attribute: string) => {
    const gauge = gauges.find(
      (g: GaugeWithMeasurements) => g.name === gaugeName,
    )
    if (!gauge) {
      return null
    }
    if (attribute === 'url') {
      return `https://waterdata.usgs.gov/monitoring-location/${gauge?.id}`
    }
    return gauge?.[attribute]
  })
}

export default addGlobalData
