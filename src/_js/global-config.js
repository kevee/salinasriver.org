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
  popupHtml(title, url) {
    return `<a class="map-popup-link" href="${url}">${title}</a>`
  },
}
