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

**Note:** This is a _draft_ 2023 release schedule based on the latest agenda from the Monterey County Water Resources Agency. It will be updated and this message removed once the final schedule is updated.

| Month     | Combined release (<abbr title="Cubic-feet per second">cfs</abbr>) |
| --------- | ----------------------------------------------------------------- |
| January   | 809                                                               |
| February  | 433                                                               |
| March     | 3007                                                              |
| April     | 241                                                               |
| May       | 168                                                               |
| June      | 375                                                               |
| July      | 579                                                               |
| August    | 660                                                               |
| September | 610                                                               |
| October   | 292                                                               |
| November  | 70                                                                |
| December  | 70                                                                |

<small>From the [Monterey County Water Resources Agency](https://monterey.legistar.com/DepartmentDetail.aspx?ID=44516&GUID=4F31AF02-60AB-48F1-ADBC-00D883A74259&R=ceb2224f-37fd-4219-b133-1eaab17ee342).</small>

The water flows down Nacimiento River and joins up with the Salinas just south of the town of Bradley. When the [river guage at Bradley](https://waterdata.usgs.gov/nwis/uv?site_no=11150500) is over 400 cfs (it is currently {{guages.bradley.cfs}}), the water can sometimes reach beyond King City.

<div class="map medium bordered">
  <div id="map" data-lat="35.832921" data-lon="-120.756226" data-zoom="11"></div>
  <p class="note">Where the Nacimiento joins up with the Salinas.</p>
</div>
