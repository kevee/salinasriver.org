import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import exifr from 'exifr'
import convert from 'heic-convert'
import axios from 'axios'
import gauges from './gauges.js'

interface PhotoEntry {
  filename: string
  originalFilename: string
  date: string
  lat: number
  lon: number
  cfs: number | null
  height: number | null
}

interface AccessPoint {
  slug: string
  lat: number
  lon: number
  gauge: string
  photos?: PhotoEntry[]
  [key: string]: any
}

const IMAGES_INPUT_DIR = './src/_images'
const IMAGES_OUTPUT_DIR = './src/assets/images/photos'
const ACCESS_POINTS_DIR = './src/_data/accessPoints'
const JPEG_WIDTH = 1200
const SUPPORTED_EXTENSIONS = ['.heic', '.heif', '.jpg', '.jpeg', '.png', '.tiff']

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function findClosestAccessPoint(
  lat: number,
  lon: number,
  accessPoints: AccessPoint[]
): AccessPoint {
  let closest: AccessPoint = accessPoints[0]
  let minDist = Infinity
  for (const ap of accessPoints) {
    const dist = haversineDistance(lat, lon, ap.lat, ap.lon)
    if (dist < minDist) {
      minDist = dist
      closest = ap
    }
  }
  return closest
}

async function fetchUSGSDailyValues(
  gaugeName: string,
  dateStr: string
): Promise<{ cfs: number | null; height: number | null }> {
  const gauge = gauges.find((g) => g.name === gaugeName)
  if (!gauge) {
    console.warn(`[process-photos] No gauge found with name "${gaugeName}"`)
    return { cfs: null, height: null }
  }

  const url = `https://waterservices.usgs.gov/nwis/dv/?sites=${gauge.id}&parameterCd=00060,00065&startDT=${dateStr}&endDT=${dateStr}&format=json`

  try {
    const response = await axios.get(url)
    const timeSeries = response.data?.value?.timeSeries
    if (!timeSeries || timeSeries.length === 0) {
      console.warn(
        `[process-photos] No USGS data for gauge ${gauge.id} on ${dateStr}`
      )
      return { cfs: null, height: null }
    }

    let cfs: number | null = null
    let height: number | null = null

    for (const series of timeSeries) {
      const paramCode = series.variable?.variableCode?.[0]?.value
      const value = parseFloat(series.values?.[0]?.value?.[0]?.value)
      if (paramCode === '00060' && !isNaN(value)) cfs = value
      if (paramCode === '00065' && !isNaN(value)) height = value
    }

    return { cfs, height }
  } catch (err: any) {
    console.warn(
      `[process-photos] USGS API error for gauge ${gauge.id} on ${dateStr}:`,
      err.message
    )
    return { cfs: null, height: null }
  }
}

function isAlreadyProcessed(
  originalFilename: string,
  accessPoints: AccessPoint[]
): boolean {
  return accessPoints.some((ap) =>
    ap.photos?.some((p) => p.originalFilename === originalFilename)
  )
}

const processPhotos = async (_eleventyConfig: any) => {
  if (!fs.existsSync(IMAGES_INPUT_DIR)) {
    console.log('[process-photos] No _images directory found, skipping.')
    return
  }

  if (!fs.existsSync(IMAGES_OUTPUT_DIR)) {
    fs.mkdirSync(IMAGES_OUTPUT_DIR, { recursive: true })
  }

  const apFiles = fs
    .readdirSync(ACCESS_POINTS_DIR)
    .filter((f) => f.endsWith('.json'))
  const accessPoints: AccessPoint[] = apFiles.map((f) => {
    const raw = fs.readFileSync(path.join(ACCESS_POINTS_DIR, f), 'utf-8')
    return JSON.parse(raw)
  })

  for (const ap of accessPoints) {
    if (!ap.photos) ap.photos = []
  }

  const files = fs
    .readdirSync(IMAGES_INPUT_DIR)
    .filter((f) =>
      SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase())
    )

  for (const file of files) {
    const inputPath = path.join(IMAGES_INPUT_DIR, file)
    const jpegFilename = path.parse(file).name + '.jpg'
    const outputPath = path.join(IMAGES_OUTPUT_DIR, jpegFilename)

    if (isAlreadyProcessed(file, accessPoints)) {
      console.log(`[process-photos] Skipping ${file} (already processed)`)
      continue
    }

    let exifData: any
    try {
      exifData = await exifr.parse(inputPath, { gps: true })
    } catch (err: any) {
      console.warn(
        `[process-photos] Failed to read EXIF from ${file}:`,
        err.message
      )
      continue
    }

    if (!exifData?.latitude || !exifData?.longitude) {
      console.warn(`[process-photos] No GPS data in ${file}, skipping.`)
      continue
    }

    if (!exifData?.DateTimeOriginal) {
      console.warn(`[process-photos] No date in ${file}, skipping.`)
      continue
    }

    const photoLat: number = exifData.latitude
    const photoLon: number = exifData.longitude
    const photoDate: Date = exifData.DateTimeOriginal
    const dateStr = photoDate.toISOString().split('T')[0]

    // Convert/resize the image
    try {
      const ext = path.extname(file).toLowerCase()
      let sharpInput: string | Buffer = inputPath
      if (ext === '.heic' || ext === '.heif') {
        const heicBuffer = fs.readFileSync(inputPath)
        sharpInput = await convert({
          buffer: heicBuffer,
          format: 'JPEG',
          quality: 1,
        }) as Buffer
      }
      await sharp(sharpInput)
        .resize({ width: JPEG_WIDTH })
        .jpeg({ quality: 80 })
        .toFile(outputPath)
      console.log(`[process-photos] Converted ${file} -> ${jpegFilename}`)
    } catch (err: any) {
      console.warn(
        `[process-photos] Failed to convert ${file}:`,
        err.message
      )
      continue
    }

    const closest = findClosestAccessPoint(photoLat, photoLon, accessPoints)
    console.log(
      `[process-photos] ${file} -> closest access point: ${closest.slug}`
    )

    const { cfs, height } = await fetchUSGSDailyValues(
      closest.gauge,
      dateStr
    )
    console.log(
      `[process-photos] USGS data for ${closest.gauge} on ${dateStr}: cfs=${cfs}, height=${height}`
    )

    const photoEntry: PhotoEntry = {
      filename: jpegFilename,
      originalFilename: file,
      date: dateStr,
      lat: photoLat,
      lon: photoLon,
      cfs,
      height,
    }

    closest.photos!.push(photoEntry)
  }

  for (const ap of accessPoints) {
    if (ap.photos && ap.photos.length > 0) {
      const apFilename = `${ap.slug}.json`
      const apPath = path.join(ACCESS_POINTS_DIR, apFilename)
      fs.writeFileSync(apPath, JSON.stringify(ap, null, 2) + '\n', 'utf-8')
      console.log(
        `[process-photos] Updated ${apFilename} with ${ap.photos.length} photo(s)`
      )
    }
  }
}

export default processPhotos
