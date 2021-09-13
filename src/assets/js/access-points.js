;(() => {
  fetch('/assets/js/river.json')
    .then((response) => response.json())
    .then((river) => {
      const map = L.map('map').setView(
        [36.44525673494023, -121.3909406528181],
        9.5
      )

      L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {
          attribution:
            'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
        }
      ).addTo(map)

      L.geoJSON(river, {
        style: { stroke: false, fillOpacity: 0.9, fill: '#055AE3' },
      }).addTo(map)

      window._accessPoints.forEach((point) => {
        const circle = L.circleMarker([point.lat, point.lon], {
          radius: 15,
          fillColor: '#F50022',
          fillOpacity: 0.7,
          stroke: false,
        }).addTo(map)

        circle.bindPopup(
          `<h3><a href="${point.url}">${point.title}</a></h3><p>Access point</p>`
        )
      })
    })
})()
