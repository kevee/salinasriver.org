---
title: Nacimiento dam release
layout: layouts/default.njk
scripts:
  - /assets/js/leaflet/leaflet.js
  - /assets/js/content-map.js
breadcrumbs:
  - name: Home
    link: /
  - name: Overview
    link: /overview
---

# Nacimiento and San Antonio release schedule

Most of the water-related activities on the southern Salinas depend on dam release from the Nacimiento reservoir, and to a lesser extent the San Antonio reservoir. While you can get [real-time flow information from the USGS](https://waterdata.usgs.gov/nwis/uv?site_no=11150500), if you are planning a trip in the future you should consider the following dam release sechedule.

| Month     | Combined release (<abbr title="Cubic-feet per second">cfs</abbr>) |
| --------- | ----------------------------------------------------------------- |
| January   | 70                                                                |
| February  | 97                                                                |
| March     | 448                                                               |
| April     | 841                                                               |
| May       | 360                                                               |
| June      | 445                                                               |
| July      | 574                                                               |
| August    | 647                                                               |
| September | 502                                                               |
| October   | 276                                                               |
| November  | 70                                                                |
| December  | 70                                                                |

<small>From the [Monterey County Water Resources Agency 2024 release schedule](https://www.countyofmonterey.gov/home/showpublisheddocument/121560). CFS is defined as "Mean daily flow for the month."</small>

The water flows down the Nacimiento and San Antonio Rivers, both of which join up with the Salinas just south of the town of Bradley. When the [river guage at Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) is over 400 cfs (it is currently {{guages.bradley.cfs}}), the water can sometimes reach beyond King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note">Where the Nacimiento joins up with the Salinas.</p>
</div>
