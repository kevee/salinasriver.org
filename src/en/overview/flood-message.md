---
title: Automated flood warning
layout: default
breadcrumbs:
  - name: Home
    link: /
  - name: Overview
    link: /overview
---

# Automated flood warning

This website is updated several times a day with data from USGS water guages. If any of these guages cross a defined threshold by NOAA, we automatically place a warning on every page of the site. We use the below water levels to tests if any guage is approaching flood stage.

All of these water levels are a few feet lower than the "Action" stage of the guage. For example, the [yellow water level in the Spreckles gauge](https://water.noaa.gov/gauges/sprc1).

| Gauge | Water level |
| --- | --- |
{%- for gauge in gauges %}
| [{{ gauge.label }}]({{ gauge.floodUrl }}) | {{ gauge.flood }} feet |
{%- endfor %}
