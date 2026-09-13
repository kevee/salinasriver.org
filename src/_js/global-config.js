const globalConfig = {
  routeStyle: { stroke: 6, color: '#0050b8' },
  walkingStyle: { color: '#f50022', opacity: 0.8 },
  walkingColor: '#f50022',
  accessPointColor: '#f50022',
  accessPointEndColor: '#0050b8',
  mainColor: '#f50022',
  highlightColor: '#0050b8',
  riverColor: '#0077be',
  satelliteMapOpacity: 0.6,
  // Carto basemap tiles. The key is tied to the salinasriver.org referer and is safe to ship
  // client-side. Carto rejects it from any other host, so local dev falls back to keyless tiles.
  cartoApiKey: 'cb1_3j9k_1_f7403d27a9d59dd70a58d835',
  get basemapTileUrl() {
    const base = 'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    return isLocal ? base : `${base}?key=${this.cartoApiKey}`
  },
  mapAttribution:
    'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
  markerStyle(radius) {
    return {
      radius,
      fillColor: this.mainColor,
      fillOpacity: 0.9,
      stroke: true,
      color: '#fff',
      weight: 2,
    }
  },
  highlightMarkerStyle(radius) {
    return {
      radius,
      fillColor: this.highlightColor,
      fillOpacity: 1,
      stroke: true,
      color: '#fff',
      weight: 2,
    }
  },
  popupHtml(title, url, details) {
    let html = `<a class="map-popup-link" href="${url}">${title}</a>`
    if (details) {
      html += `<span class="map-popup-details">${details}</span>`
    }
    return html
  },
}
