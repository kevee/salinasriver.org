document.addEventListener('DOMContentLoaded', () => {
  const map = new L.Map('trip-map').setView(
    [options.centerLat, options.centerLon],
    15
  )

  new L.TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {
      attribution:
        'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
    }
  ).addTo(map)

  const tripLayer = new L.GeoJSON(options.route, {
    style: globalConfig.routeStyle,
  }).addTo(map)

  map.fitBounds(tripLayer.getBounds(), {
    padding: [20, 20],
  })

  for (const part of options.parts) {
    const circle = new L.CircleMarker([part.lat, part.lon], {
      radius: 15,
      fillColor: globalConfig.accessPointColor,
      fillOpacity: 0.7,
      stroke: false,
    }).addTo(map)

    circle.bindPopup(
      `<a href="#part-${part.id}">${
        part.translate[options.language].title
      }</a>`,
      {
        minWidth: 100,
      }
    )
  }
})
