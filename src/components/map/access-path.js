import React, { useRef } from 'react'
import Map, { Layer, Source } from 'react-map-gl'
import styled from '@emotion/styled'
import bbox from 'geojson-bbox'
import colors from '../../utils/colors'
import mapLayers from '../../utils/map-layers'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${colors.darkGrey};
  margin: 1rem 0;
`

const AccessPath = ({ path }) => {
  const mapRef = useRef(null)
  if (!path) {
    return null
  }
  let geoJson = false
  try {
    geoJson = JSON.parse(path)
  } catch (e) {
    return null
  }
  if (!geoJson) {
    return null
  }
  const box = bbox(geoJson.features[0])

  return (
    <MapWrapper>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        style={{ width: '100%', height: 600 }}
        mapStyle={mapLayers.satellite}
        initialViewState={{
          bounds: box,
          padding: 20,
        }}
      >
        <Source type="geojson" data={geoJson} id="access-path">
          <Layer
            id="access-path"
            type="line"
            paint={{
              'line-width': 5,
              'line-color': colors.red,
            }}
          />
        </Source>
      </Map>
    </MapWrapper>
  )
}

export default AccessPath
