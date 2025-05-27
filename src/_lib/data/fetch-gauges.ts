import Fetch from '@11ty/eleventy-fetch'
import gauges from './gauges.js'
import type { Gauge } from './gauges.js'

/**
 * Represents a gauge with its current flow (cfs) and height measurements.
 * Extends the base Gauge type with additional measurement data.
 */
type GaugeWithMeasurements = Gauge & {
  /** The cubic feet per second measurement for the gauge */
  cfs: number
  /** The height measurement (in feet) for the gauge */
  height: number
}

/**
 * Helper function that parses the time series data from the USGS API response.
 */
const parseTimeseries = (timeSeries: any) => ({
  gauge: parseInt(timeSeries.sourceInfo.siteCode[0].value, 10),
  value: parseFloat(timeSeries.values[0].value[0].value),
})

/**
 * Fetches gauge data and organizes it into gauge information, cubic feet per second (cfs),
 * and gauge height measurements.
 * @returns An object containing gauges information, cfs measurements, and gauge height measurements
 */
const fetchGauges = async (): Promise<GaugeWithMeasurements[]> => {
  const gaugeData = await Fetch(
    `https://waterservices.usgs.gov/nwis/iv/?sites=${gauges
      .map((gauge) => gauge.id)
      .join(',')}&parameterCd=00060,00065&format=json`,
    {
      duration: '1d',
      type: 'json',
    }
  )

  if (!gaugeData.value.timeSeries) {
    console.error('No time series data found')
    return [...gauges].map((gauge) => ({
      ...gauge,
      cfs: 0,
      height: 0,
    }))
  }

  const cfs = gaugeData.value.timeSeries
    .filter(
      (timeSeries) => timeSeries.variable.variableCode[0].value === '00060'
    )
    .map(parseTimeseries)

  const gageHeight = gaugeData.value.timeSeries
    .filter(
      (timeSeries) => timeSeries.variable.variableCode[0].value === '00065'
    )
    .map(parseTimeseries)

  return [...gauges].map((gauge) => ({
    ...gauge,
    cfs: cfs.find((cfs) => cfs.gauge === gauge.id)?.value || 0,
    height: gageHeight.find((height) => height.gauge === gauge.id)?.value || 0,
  }))
}

export default fetchGauges

export type { Gauge, GaugeWithMeasurements }
