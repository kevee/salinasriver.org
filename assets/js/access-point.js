;(() => {
  var map = L.map('map').setView(
    [window._accessPointLat, window._accessPointLon],
    15
  )

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution:
        'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }
  ).addTo(map)

  const jsonLayer = L.geoJSON(window._accessPointPath, {
    style: { stroke: 6, color: '#F50022' },
  }).addTo(map)

  map.fitBounds(jsonLayer.getBounds())
})()
