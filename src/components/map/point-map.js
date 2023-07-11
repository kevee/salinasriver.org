import React from 'react'
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

const MapCaption = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
`

const PointMap = ({
  longitude,
  latitude,
  zoom,
  caption = false,
  satellite = false,
}) => {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [longitude, latitude] },
      },
    ],
  }

  return (
    <MapWrapper>
      <Map
        mapboxAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        style={{ width: '100%', height: 400 }}
        mapStyle={satellite ? mapLayers.satellite : mapLayers.river}
      >
        <Source type="geojson" data={geojson}>
          <Layer
            type="circle"
            paint={{
              'circle-radius': 15,
              'circle-color': colors.red,
              'circle-opacity': 0.8,
            }}
          />
        </Source>
      </Map>
      {caption && <MapCaption>{caption}</MapCaption>}
    </MapWrapper>
  )
}

export default PointMap
