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
    style: globalConfig.walkingStyle,
  }).addTo(map)

  map.fitBounds(directionLayer.getBounds())

  const start = options.data.features[0].geometry.coordinates[0][0]
  const end = options.data.features[0].geometry.coordinates[0].slice(-1)[0]

  new L.CircleMarker([start[1], start[0]], {
    radius: 15,
    fillColor: globalConfig.accessPointEndColor,
    fillOpacity: 0.7,
    stroke: false,
  }).addTo(map)

  new L.CircleMarker([end[1], end[0]], {
    radius: 15,
    fillColor: globalConfig.accessPointEndColor,
    fillOpacity: 0.7,
    stroke: false,
  }).addTo(map)
})
