---
title: Nacimiento dam release
layout: layouts/default.njk
scripts:
  - /assets/js/leaflet/leaflet.js
  - /assets/js/content-map.js
breadcrumbs:
  - name: Inicio
    link: /
  - name: Overview
    link: /overview
---

# Nacimiento dam release

Most of the water-related activities on the southern Salinas depend on dam release from Lake Nacimiento. Without the dam, the Salinas would only flow at all during the wet season between December and May. While you can get [real-time flow information from the USGS](https://waterdata.usgs.gov/nwis/uv?site_no=11150500), if you are planning a trip in the future you should consider the dam release sechedule.

| Month     | Combined release (<abbr title="Cubic-feet per second">cfs</abbr>) |
| --------- | ----------------------------------------------------------------- |
| January   | 806                                                               |
| February  | 427                                                               |
| March     | 3082                                                              |
| April     | 257                                                               |
| May       | 168                                                               |
| June      | 375                                                               |
| July      | 579                                                               |
| August    | 660                                                               |
| September | 610                                                               |
| October   | 292                                                               |
| November  | 70                                                                |
| December  | 70                                                                |

<small>From the [Monterey County Water Resources Agency 2023 release schedule](https://www.co.monterey.ca.us/home/showpublisheddocument/121560/638174902801170000). CFS is defined as "Mean daily flow for the month."</small>

The water flows down Nacimiento River and joins up with the Salinas just south of the town of Bradley. When the [river guage at Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) is over 400 cfs (it is currently {{guages.bradley.cfs}}), the water can sometimes reach beyond King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note">Where the Nacimiento joins up with the Salinas.</p>
</div>
