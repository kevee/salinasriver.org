document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('access-points-map')
  if (!mapContainer) return

  // Match the map height to the nav list height
  const nav = mapContainer.closest('.columns')?.querySelector('nav.inline-nav')
  if (nav) {
    mapContainer.style.height = nav.offsetHeight + 'px'
  }

  const map = new L.Map('access-points-map')

  new L.TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {
      attribution: globalConfig.mapAttribution,
    },
  ).addTo(map)

  const markers = {}
  const markerRadius = 8

  const defaultStyle = {
    radius: markerRadius,
    fillColor: globalConfig.mainColor,
    fillOpacity: 0.8,
    stroke: false,
  }

  const highlightStyle = {
    radius: markerRadius * 1.5,
    fillColor: globalConfig.highlightColor,
    fillOpacity: 1,
    stroke: false,
  }

  const allMarkersGroup = new L.FeatureGroup()

  for (const point of options.accessPoints) {
    if (!point.lat || !point.lon) continue

    const slug = point.slug

    const marker = new L.CircleMarker([point.lat, point.lon], defaultStyle)
    marker.addTo(map)
    allMarkersGroup.addLayer(marker)
    markers[slug] = marker

    marker.on('mouseover', () => highlightAccessPoint(slug))
    marker.on('mouseout', () => unhighlightAccessPoint(slug))
    marker.on('click', () => {
      const listItem = document.querySelector(
        `[data-access-point-slug="${slug}"]`,
      )
      if (listItem) {
        const link = listItem.querySelector('a')
        if (link) link.click()
      }
    })
  }

  if (allMarkersGroup.getLayers().length > 0) {
    map.fitBounds(allMarkersGroup.getBounds(), {
      padding: [20, 20],
    })
  }

  // Add the river layer after fitBounds so the map has an initialized view
  function riverStyle() {
    const zoom = map.getZoom()
    if (zoom < 11) {
      return {
        stroke: true,
        color: globalConfig.riverColor,
        weight: 4,
        fillColor: globalConfig.riverColor,
        fillOpacity: 1,
      }
    }
    return {
      stroke: false,
      fillColor: globalConfig.riverColor,
      fillOpacity: 0.5,
    }
  }

  const riverLayer = new L.GeoJSON(riverGeoJson, {
    style: riverStyle,
    interactive: false,
  }).addTo(map)
  riverLayer.bringToBack()

  map.on('zoom', () => {
    riverLayer.setStyle(riverStyle())
  })

  function highlightAccessPoint(slug) {
    if (markers[slug]) {
      markers[slug].setStyle(highlightStyle)
      markers[slug].setRadius(highlightStyle.radius)
      markers[slug].bringToFront()
    }

    const listItem = document.querySelector(
      `[data-access-point-slug="${slug}"]`,
    )
    if (listItem) {
      listItem.classList.add('access-point-highlighted')
    }
  }

  function unhighlightAccessPoint(slug) {
    if (markers[slug]) {
      markers[slug].setStyle(defaultStyle)
      markers[slug].setRadius(defaultStyle.radius)
    }

    const listItem = document.querySelector(
      `[data-access-point-slug="${slug}"]`,
    )
    if (listItem) {
      listItem.classList.remove('access-point-highlighted')
    }
  }

  const listItems = document.querySelectorAll('[data-access-point-slug]')
  listItems.forEach((item) => {
    const slug = item.dataset.accessPointSlug
    item.addEventListener('mouseenter', () => highlightAccessPoint(slug))
    item.addEventListener('mouseleave', () => unhighlightAccessPoint(slug))
  })
})
