document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('trips-map')
  if (!mapContainer) return

  // Create the map
  const map = new L.Map('trips-map').setView([0, 0], 2)

  new L.TileLayer(
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    {
      attribution: globalConfig.mapAttribution,
    },
  ).addTo(map)

  // Store references to layers and list items
  const tripLayers = {}
  const tripStartMarkers = {}
  const tripEndMarkers = {}

  // Default and highlight styles
  const defaultStyle = {
    weight: 4,
    color: globalConfig.mainColor,
    opacity: 0.6,
  }
  const highlightStyle = {
    weight: 6,
    color: globalConfig.highlightColor,
    opacity: 1,
  }
  const markerRadius = 6
  const defaultMarkerStyle = {
    radius: markerRadius,
    fillColor: globalConfig.mainColor,
    fillOpacity: 0.8,
    stroke: false,
  }
  const highlightMarkerStyle = {
    radius: markerRadius * 1.5,
    fillColor: globalConfig.highlightColor,
    fillOpacity: 1,
    stroke: false,
  }

  // Add the river layer
  const riverLayer = new L.GeoJSON(riverGeoJson, {
    style: { stroke: false, fillColor: globalConfig.riverColor, fillOpacity: 0.5 },
    interactive: false,
  }).addTo(map)
  riverLayer.bringToBack()

  // Create a feature group to hold all trip layers for bounds calculation
  const allTripsGroup = new L.FeatureGroup()
  // Add each trip to the map
  for (const trip of options.trips) {
    if (!trip.route || !trip.route.features || !trip.route.features.length)
      continue

    const slug = trip.slug

    // Create the route layer
    const tripLayer = new L.GeoJSON(trip.route, {
      style: defaultStyle,
    })

    tripLayer.addTo(map)
    allTripsGroup.addLayer(tripLayer)
    tripLayers[slug] = tripLayer

    // Get the coordinates for start and end markers
    const feature = trip.route.features[0]
    if (feature && feature.geometry && feature.geometry.coordinates) {
      const coords = feature.geometry.coordinates
      const startCoord = coords[0]
      const endCoord = coords[coords.length - 1]
      console.log(startCoord, endCoord)

      // Create start marker (small circle)
      const startMarker = new L.CircleMarker(
        [startCoord[1], startCoord[0]],
        defaultMarkerStyle,
      ).addTo(map)
      tripStartMarkers[slug] = startMarker

      // Create end marker (small circle)
      const endMarker = new L.CircleMarker(
        [endCoord[1], endCoord[0]],
        defaultMarkerStyle,
      ).addTo(map)
      tripEndMarkers[slug] = endMarker
    }

    // Add hover/click events to the route layer and markers
    const tripClick = () => {
      const listItem = document.querySelector(`[data-trip-slug="${slug}"]`)
      if (listItem) {
        const link = listItem.querySelector('a')
        if (link) link.click()
      }
    }
    for (const layer of [
      tripLayer,
      tripStartMarkers[slug],
      tripEndMarkers[slug],
    ]) {
      if (!layer) continue
      layer.on('mouseover', () => highlightTrip(slug))
      layer.on('mouseout', () => unhighlightTrip(slug))
      layer.on('click', tripClick)
    }
  }

  // Fit map to show all trips
  if (allTripsGroup.getLayers().length > 0) {
    map.invalidateSize()
    map.fitBounds(allTripsGroup.getBounds(), {
      padding: [20, 20],
    })
  }

  // Highlight function
  function highlightTrip(slug) {
    // Highlight the route
    if (tripLayers[slug]) {
      tripLayers[slug].setStyle(highlightStyle)
      tripLayers[slug].bringToFront()
    }

    // Highlight markers
    if (tripStartMarkers[slug]) {
      tripStartMarkers[slug].setStyle(highlightMarkerStyle)
      tripStartMarkers[slug].bringToFront()
    }
    if (tripEndMarkers[slug]) {
      tripEndMarkers[slug].setStyle(highlightMarkerStyle)
      tripEndMarkers[slug].bringToFront()
    }

    // Highlight list item
    const listItem = document.querySelector(`[data-trip-slug="${slug}"]`)
    if (listItem) {
      listItem.classList.add('trip-highlighted')
    }
  }

  // Unhighlight function
  function unhighlightTrip(slug) {
    // Reset route style
    if (tripLayers[slug]) {
      tripLayers[slug].setStyle(defaultStyle)
    }

    // Reset markers
    if (tripStartMarkers[slug]) {
      tripStartMarkers[slug].setStyle(defaultMarkerStyle)
    }
    if (tripEndMarkers[slug]) {
      tripEndMarkers[slug].setStyle(defaultMarkerStyle)
    }

    // Remove list item highlight
    const listItem = document.querySelector(`[data-trip-slug="${slug}"]`)
    if (listItem) {
      listItem.classList.remove('trip-highlighted')
    }
  }

  // Add hover events to list items
  const listItems = document.querySelectorAll('[data-trip-slug]')
  listItems.forEach((item) => {
    const slug = item.dataset.tripSlug
    item.addEventListener('mouseenter', () => highlightTrip(slug))
    item.addEventListener('mouseleave', () => unhighlightTrip(slug))
  })
})
