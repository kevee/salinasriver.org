---
title: Desembalse de la presa de Nacimiento
layout: layouts/default.njk
scripts:
  - /assets/js/leaflet/leaflet.js
  - /assets/js/content-map.js
breadcrumbs:
  - name: Inicio
    link: /
  - name: Resumen
    link: /overview
---

# Desembalse de la presa de Nacimiento

La mayoría de las actividades relacionadas con el agua en el sur del Salinas dependen de la descarga de la presa del lago Nacimiento. Sin la presa, el río Salinas sólo tendría caudal durante la estación húmeda, entre diciembre y mayo. Aunque puede obtener [información sobre el caudal en tiempo real del USGS](https://waterdata.usgs.gov/nwis/uv?site_no=11150500), si está planeando un viaje en el futuro debe tener en cuenta el calendario de desembalse de la presa.

| Mes        | Liberación combinada (<abbr title="Pies cúbicos por segundo">cfs</abbr>) |
| ---------- | ------------------------------------------------------------------------ |
| Enero      | 70                                                                       |
| Febrero    | 97                                                                       |
| Marzo      | 448                                                                      |
| Abril      | 841                                                                      |
| Mayo       | 360                                                                      |
| Junio      | 445                                                                      |
| Julio      | 574                                                                      |
| Agosto     | 647                                                                      |
| Septiembre | 502                                                                      |
| Octubre    | 276                                                                      |
| Noviembre  | 70                                                                       |
| Diciembre  | 70                                                                       |

<small>Del [calendario de desembalses para 2024 de la Agencia de Recursos Hídricos del Condado de Monterey](https://www.countyofmonterey.gov/home/showpublisheddocument/121560). CFS se define como "caudal medio diario del mes".</small>

El agua baja por el río Nacimiento y se une al Salinas justo al sur de la ciudad de Bradley. Cuando el [medidor fluvial en Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) supera los 400 pcs (actualmente es {{guages.bradley.cfs}}), el agua puede llegar a veces más allá de King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note"> Donde el Nacimiento se une con el Salinas.</p>
</div>
