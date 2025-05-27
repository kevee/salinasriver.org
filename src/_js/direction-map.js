document.addEventListener('DOMContentLoaded', () => {
  const map = new L.Map('direction-map').setView(
    [options.centerLat, options.centerLon],
    15
  )

  new L.TileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }
  ).addTo(map)

  const directionLayer = new L.GeoJSON(options.data, {
    style: { stroke: 6, color: '#F50022' },
  }).addTo(map)

  map.fitBounds(directionLayer.getBounds())
})
