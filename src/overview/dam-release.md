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

# Nacimiento dam release

Most of the water-related activities on the southern Salinas depend on dam release from Lake Nacimiento. Without the dam, the Salinas would only flow at all during the wet season between December and May. While you can get [real-time flow information from the USGS](https://waterdata.usgs.gov/nwis/uv?site_no=11150500), if you are planning a trip in the future you should consider the dam release sechedule.

| Month     | Combined release (<abbr title="Cubic-feet per second">cfs</abbr>) |
| --------- | ----------------------------------------------------------------- |
| January   | 74                                                                |
| February  | 70                                                                |
| March     | 70                                                                |
| April     | 536                                                               |
| May       | 521                                                               |
| June      | 594                                                               |
| July      | 540                                                               |
| August    | 70                                                                |
| September | 70                                                                |
| October   | 70                                                                |
| November  | 70                                                                |
| December  | 70                                                                |

<small>From the [Monterey County Water Resources Agency](https://www.co.monterey.ca.us/home/showdocument?id=22193).</small>

The water flows down Nacimiento River and joins up with the Salinas just south of the town of Bradley. When the [river guage at Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) is over 400 cfs (it is currently {{guages.bradley.cfs}}), the water can sometimes reach beyond King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note">Where the Nacimiento joins up with the Salinas.</p>
</div>
