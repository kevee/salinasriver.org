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

<div class="alert">This table is the **provisional** release schedule for 2025. The final schedule will be updated late April.</div>

| Month     | Combined release (<abbr title="Cubic-feet per second">cfs</abbr>) |
| --------- | ----------------------------------------------------------------- |
| January   | 73                                                                |
| February  | 172                                                               |
| March     | 218                                                               |
| April     | 380                                                               |
| May       | 409                                                               |
| June      | 488                                                               |
| July      | 600                                                               |
| August    | 638                                                               |
| September | 470                                                               |
| October   | 220                                                               |
| November  | 70                                                                |
| December  | 70                                                                |

<small>From the [Monterey County Water Resources Agency 2025 provisional release schedule](https://monterey.legistar.com/gateway.aspx?M=F&ID=fea9a761-9345-495c-8476-050c65fe7e81.pdf). CFS is defined as "Mean daily flow for the month."</small>

The water flows down the Nacimiento and San Antonio Rivers, both of which join up with the Salinas just south of the town of Bradley. When the [river guage at Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) is over 400 cfs (it is currently {{guages.bradley.cfs}}), the water can sometimes reach beyond King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note">Where the Nacimiento joins up with the Salinas.</p>
</div>
