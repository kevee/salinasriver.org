;(() => {
  const map = L.map('map').setView([36.5084398, -121.4912514], 10)

  L.tileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {
      attribution:
        'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }
  ).addTo(map)

  const jsonLayer = L.geoJSON(window._tripRoute, {
    style: { stroke: 15, color: '#055AE3' },
  }).addTo(map)

  map.fitBounds(jsonLayer.getBounds())

  window._tripParts.forEach((part) => {
    const circle = L.circleMarker([part.lat, part.lon], {
      radius: 15,
      fillColor: '#F50022',
      fillOpacity: 0.7,
      stroke: false,
    }).addTo(map)

    circle.bindPopup(`<h4><a href="#${part.id}">${part.title}</a></h4>`)
  })
})()
