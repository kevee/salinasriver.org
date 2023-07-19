import React from 'react'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import colors from '../../../utils/colors'
import river from '../../../data/river.json'

const HomepageMap = ({ width, height }) => {
  return (
    <svg width={width} height={height}>
      <g>
        {river.features.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(
              geoAlbersUsa().fitExtent(
                [
                  [0, 0],
                  [width, height],
                ],
                river
              )
            )(d)}
            fill={colors.blue}
          />
        ))}
      </g>
    </svg>
  )
}

export default HomepageMap
