;(() => {
  fetch('/assets/js/river.json')
    .then((response) => response.json())
    .then((river) => {
      const mapElement = document.getElementById('map')
      const center = [
        mapElement.getAttribute('data-lat'),
        mapElement.getAttribute('data-lon'),
      ]
      const map = L.map(mapElement).setView(
        center,
        mapElement.getAttribute('data-zoom')
      )

      L.geoJSON(river, {
        style: { stroke: false, fillOpacity: 0.9, fill: '#055AE3' },
      }).addTo(map)

      L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {
          attribution:
            'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
        }
      ).addTo(map)

      const circle = L.circleMarker(center, {
        radius: 15,
        fillColor: '#F50022',
        fillOpacity: 0.7,
        stroke: false,
      }).addTo(map)
    })
})()
