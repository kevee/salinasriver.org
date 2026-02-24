document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('homepage-map')
  if (!mapContainer) return

  // Create map with minimal controls for cleaner hero look
  const map = new L.Map('homepage-map', {
    zoomControl: false,
    scrollWheelZoom: false,
  })

  // Zoom controls in upper-right
  new L.Control.Zoom({ position: 'topright' }).addTo(map)

  // CartoDB light basemap
  new L.TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    { attribution: globalConfig.mapAttribution },
  ).addTo(map)

  function riverStyle() {
    const zoom = map.getZoom()
    if (zoom < 11) {
      // At low zooms the polygon is too thin — add a thick stroke so the river stays visible

      return {
        stroke: true,
        color: globalConfig.riverColor,
        weight: 6,
        fillColor: globalConfig.riverColor,
        fillOpacity: 1,
      }
    }
    return {
      stroke: false,
      fillColor: globalConfig.riverColor,
      fillOpacity: 0.9,
    }
  }

  // Create markers for each access point
  const allMarkersGroup = new L.FeatureGroup()
  const markerRadius = 15

  for (const point of options.accessPoints) {
    if (!point.lat || !point.lon) continue

    const marker = new L.CircleMarker([point.lat, point.lon], globalConfig.markerStyle(markerRadius))

    const title = point.translate[options.language]?.title || point.slug
    const url = `/${options.language}/access-points/${point.slug}/`
    marker.bindPopup(globalConfig.popupHtml(title, url))

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
    style: riverStyle,
    interactive: false,
  }).addTo(map)
  riverLayer.bringToBack()

  map.on('zoom', () => {
    riverLayer.setStyle(riverStyle())
  })
})
