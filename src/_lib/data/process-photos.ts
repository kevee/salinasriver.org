import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
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
  type?: 'photo' | 'video'
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
const THUMB_WIDTH = 400
const SUPPORTED_EXTENSIONS = ['.heic', '.heif', '.jpg', '.jpeg', '.png', '.tiff']
const SUPPORTED_VIDEO_EXTENSIONS = ['.mov', '.mp4', '.avi']

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
    const baseName = path.parse(file).name
    const jpegFilename = baseName + '.jpg'
    const thumbFilename = baseName + '-thumb.jpg'
    const outputPath = path.join(IMAGES_OUTPUT_DIR, jpegFilename)
    const thumbPath = path.join(IMAGES_OUTPUT_DIR, thumbFilename)

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
      await sharp(sharpInput)
        .resize({ width: THUMB_WIDTH })
        .jpeg({ quality: 70 })
        .toFile(thumbPath)
      console.log(`[process-photos] Converted ${file} -> ${jpegFilename} + thumbnail`)
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

  // Process video files
  const videoFiles = fs
    .readdirSync(IMAGES_INPUT_DIR)
    .filter((f) =>
      SUPPORTED_VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase())
    )

  for (const file of videoFiles) {
    const inputPath = path.join(IMAGES_INPUT_DIR, file)
    const baseName = path.parse(file).name
    const webmFilename = baseName + '.webm'
    const thumbFilename = baseName + '-thumb.jpg'
    const outputPath = path.join(IMAGES_OUTPUT_DIR, webmFilename)
    const thumbPath = path.join(IMAGES_OUTPUT_DIR, thumbFilename)

    if (isAlreadyProcessed(file, accessPoints)) {
      console.log(`[process-photos] Skipping video ${file} (already processed)`)
      continue
    }

    // Extract metadata from video using ffprobe
    let videoLat: number
    let videoLon: number
    let dateStr: string
    try {
      const probeOutput = execSync(
        `ffprobe -v quiet -print_format json -show_format "${inputPath}"`,
        { encoding: 'utf-8' }
      )
      const probe = JSON.parse(probeOutput)
      const tags = probe?.format?.tags || {}

      // Parse ISO 6709 location string like "+35.8639-120.8097+168.686/"
      const locationStr = tags['com.apple.quicktime.location.ISO6709'] || ''
      const locationMatch = locationStr.match(/^([+-]\d+\.?\d*)([+-]\d+\.?\d*)/)
      if (!locationMatch) {
        console.warn(`[process-photos] No GPS data in video ${file}, skipping.`)
        continue
      }
      videoLat = parseFloat(locationMatch[1])
      videoLon = parseFloat(locationMatch[2])

      // Parse creation time
      const creationTime = tags['creation_time']
      if (!creationTime) {
        console.warn(`[process-photos] No date in video ${file}, skipping.`)
        continue
      }
      dateStr = new Date(creationTime).toISOString().split('T')[0]
    } catch (err: any) {
      console.warn(
        `[process-photos] Failed to read metadata from video ${file}:`,
        err.message
      )
      continue
    }

    // Convert video to WebM and extract first frame thumbnail
    try {
      // Extract first frame as JPEG
      const tempThumbPath = path.join(IMAGES_OUTPUT_DIR, baseName + '-frame.jpg')
      execSync(
        `ffmpeg -y -i "${inputPath}" -vframes 1 -f image2 "${tempThumbPath}"`,
        { stdio: 'pipe' }
      )

      // Resize thumbnail with sharp
      await sharp(tempThumbPath)
        .resize({ width: THUMB_WIDTH })
        .jpeg({ quality: 70 })
        .toFile(thumbPath)

      // Clean up temp frame
      fs.unlinkSync(tempThumbPath)

      // Convert video to WebM
      execSync(
        `ffmpeg -y -i "${inputPath}" -c:v libvpx-vp9 -crf 30 -b:v 2M -c:a libopus "${outputPath}"`,
        { stdio: 'pipe' }
      )

      console.log(
        `[process-photos] Converted video ${file} -> ${webmFilename} + thumbnail`
      )
    } catch (err: any) {
      console.warn(
        `[process-photos] Failed to convert video ${file}:`,
        err.message
      )
      continue
    }

    const closest = findClosestAccessPoint(videoLat, videoLon, accessPoints)
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

    const videoEntry: PhotoEntry = {
      filename: webmFilename,
      originalFilename: file,
      date: dateStr,
      lat: videoLat,
      lon: videoLon,
      cfs,
      height,
      type: 'video',
    }

    closest.photos!.push(videoEntry)
  }

  // Generate missing thumbnails for already-processed photos
  for (const ap of accessPoints) {
    if (!ap.photos) continue
    for (const photo of ap.photos) {
      const thumbName = photo.filename.replace('.jpg', '-thumb.jpg')
      const thumbOut = path.join(IMAGES_OUTPUT_DIR, thumbName)
      const fullOut = path.join(IMAGES_OUTPUT_DIR, photo.filename)
      if (!fs.existsSync(thumbOut) && fs.existsSync(fullOut)) {
        try {
          await sharp(fullOut)
            .resize({ width: THUMB_WIDTH })
            .jpeg({ quality: 70 })
            .toFile(thumbOut)
          console.log(`[process-photos] Generated missing thumbnail: ${thumbName}`)
        } catch (err: any) {
          console.warn(`[process-photos] Failed to generate thumbnail for ${photo.filename}:`, err.message)
        }
      }
    }
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
