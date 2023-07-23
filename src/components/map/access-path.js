import React, { useRef } from 'react'
import Map, { Layer, Source } from 'react-map-gl'
import styled from '@emotion/styled'
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
  let geoJson = false
  try {
    geoJson = JSON.parse(path)
  } catch (e) {
    return null
  }
  if (!geoJson) {
    return null
  }

  return (
    <MapWrapper>
      <Map
        ref={mapRef}
        onLoad={() => {
          const layer = mapRef.current.getMap().getLayer('access-path')
          const source = mapRef.current.getMap().getSource('access-path')
          const box = source.serialize().data.features[0].geometry.bbox
          mapRef.current.fitBounds(box, { padding: 20 })
        }}
        mapboxAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        style={{ width: '100%', height: 600 }}
        mapStyle={mapLayers.satellite}
        initialViewState={{
          longitude: -121.3143298,
          latitude: 36.3473426,
          zoom: 8,
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
