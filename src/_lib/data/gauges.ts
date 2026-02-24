type Gauge = {
  id: number // USGS gauge ID
  name: string // Unique identifier for the gauge
  label: string // Display name
  flood: number // Flood level in feet
  floodUrl: string // URL to the NOAA flood level page for this gauge
}

/**
 * A list of gauges with their IDs, names, labels, and flood levels.
 */
const gauges: Gauge[] = [
  {
    id: 11152300,
    name: 'chualar',
    label: 'Chualar',
    floodUrl: 'https://water.noaa.gov/gauges/chlc1',
    flood: 9,
  },
  {
    id: 11150500,
    name: 'bradley',
    label: 'Bradley',
    floodUrl: 'https://water.noaa.gov/gauges/brdc1',
    flood: 10,
  },
  {
    id: 11151700,
    name: 'soledad',
    label: 'Soledad',
    floodUrl: 'https://water.noaa.gov/gauges/sddc1',
    flood: 13,
  },
  {
    id: 11147500,
    name: 'paso',
    label: 'Paso Robles',
    floodUrl: 'https://water.noaa.gov/gauges/prbc1',
    flood: 19,
  },
  {
    id: 11152500,
    name: 'spreckles',
    label: 'Spreckles',
    floodUrl: 'https://water.noaa.gov/gauges/sprc1',
    flood: 15,
  },
]

export default gauges

export type { Gauge }
