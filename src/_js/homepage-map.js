document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('homepage-map')
  if (!mapContainer) return

  // Create map with minimal controls for cleaner hero look
  const map = new L.Map('homepage-map', {
    zoomControl: false,
    scrollWheelZoom: false,
  })

  // CartoDB light basemap
  new L.TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    { attribution: globalConfig.mapAttribution },
  ).addTo(map)

  // Create markers for each access point
  const allMarkersGroup = new L.FeatureGroup()
  const markerRadius = 10 // Slightly larger for hero

  for (const point of options.accessPoints) {
    if (!point.lat || !point.lon) continue

    const marker = new L.CircleMarker([point.lat, point.lon], {
      radius: markerRadius,
      fillColor: globalConfig.mainColor, // #f50022
      fillOpacity: 0.9,
      stroke: true,
      color: '#fff',
      weight: 2,
    })

    // Popup with link to access point
    const title = point.translate[options.language]?.title || point.slug
    const url = `/${options.language}/access-points/${point.slug}/`
    marker.bindPopup(`<a href="${url}"><strong>${title}</strong></a>`)

    marker.on('mouseover', () => {
      marker.setRadius(markerRadius * 1.3)
      marker.openPopup()
    })
    marker.on('mouseout', () => {
      marker.setRadius(markerRadius)
    })

    marker.addTo(map)
    allMarkersGroup.addLayer(marker)
  }

  // Fit to show full river extent
  if (allMarkersGroup.getLayers().length > 0) {
    map.fitBounds(allMarkersGroup.getBounds(), {
      padding: [60, 60],
      maxZoom: 10,
    })
  }

  // Add river polygon AFTER fitBounds (required for Leaflet to render correctly)
  const riverLayer = new L.GeoJSON(riverGeoJson, {
    style: {
      stroke: false,
      fillColor: globalConfig.riverColor,
      fillOpacity: 0.9,
    },
    interactive: false,
  }).addTo(map)
  riverLayer.bringToBack()
})
