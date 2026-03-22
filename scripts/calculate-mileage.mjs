#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const accessPointsDir = join(__dirname, "../src/_data/accessPoints");

// Haversine formula: distance in miles between two [lon, lat] points
function haversineDistance([lon1, lat1], [lon2, lat2]) {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function lineStringLength(coordinates) {
  let total = 0;
  for (let i = 1; i < coordinates.length; i++) {
    total += haversineDistance(coordinates[i - 1], coordinates[i]);
  }
  return total;
}

function calcDirectionsMileage(directions) {
  if (!directions || !directions.features) return null;
  let total = 0;
  for (const feature of directions.features) {
    const geom = feature.geometry;
    if (!geom) continue;
    if (geom.type === "LineString") {
      total += lineStringLength(geom.coordinates);
    } else if (geom.type === "MultiLineString") {
      for (const line of geom.coordinates) {
        total += lineStringLength(line);
      }
    }
  }
  return Math.round(total * 100) / 100; // round to 2 decimal places
}

const files = readdirSync(accessPointsDir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const filePath = join(accessPointsDir, file);
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  const mileage = calcDirectionsMileage(data.directions);
  if (mileage !== null) {
    data.mileage = mileage;
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
    console.log(`${file}: ${mileage} miles`);
  } else {
    console.log(`${file}: no directions found`);
  }
}
