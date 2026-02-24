document.addEventListener('DOMContentLoaded', () => {
  const map = new L.Map('direction-map').setView(
    [options.centerLat, options.centerLon],
    15
  )

  new L.TileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: globalConfig.mapAttribution,
      opacity: globalConfig.satelliteMapOpacity || 1,
    }
  ).addTo(map)
  const directionLayer = new L.GeoJSON(options.data, {
    style: function() {
      const zoom = map.getZoom()
      // Scale weight inversely with zoom to maintain consistent appearance
      const baseWeight = 3
      const weight = Math.max(2, baseWeight * (18 - zoom) / 10)
      return {
        ...globalConfig.walkingStyle,
        weight: weight
      }
    }
  }).addTo(map)

  // Update line weight on zoom
  map.on('zoomend', function() {
    const zoom = map.getZoom()
    const baseWeight = 3
    const weight = Math.max(2, baseWeight * (18 - zoom) / 10)
    directionLayer.setStyle({ ...globalConfig.walkingStyle, weight: weight })
  })

  map.fitBounds(directionLayer.getBounds())

  const start = options.data.features[0].geometry.coordinates[0][0]
  const end = options.data.features[0].geometry.coordinates[0].slice(-1)[0]

  new L.CircleMarker([start[1], start[0]], globalConfig.markerStyle(10)).addTo(map)

  new L.CircleMarker([end[1], end[0]], globalConfig.markerStyle(10)).addTo(map)
})
