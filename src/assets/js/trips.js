;(() => {
  fetch('/assets/js/river.json')
    .then((response) => response.json())
    .then((river) => {
      const map = L.map('map').setView(
        [36.44525673494023, -121.3909406528181],
        9
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

      window._trips.forEach((trip) => {
        const circle = L.circleMarker([trip.lat, trip.lon], {
          radius: 15,
          fillColor: '#444dfa',
          fillOpacity: 0.7,
          stroke: false,
        }).addTo(map)

        circle.bindPopup(
          `<h3><a href="${trip.url}">${trip.title}</a></h3><p>Trip, ${trip.length}</p>`
        )
      })
    })
})()
