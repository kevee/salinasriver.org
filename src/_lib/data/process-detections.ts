import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import sharp from 'sharp'

interface Detection {
  originalUrl: string
  datestamp: string
  imageUrl: string
  thumbnailUrl: string
}

const REPO_URL = 'https://github.com/kevee/salinas-river-finder'
const CACHE_DIR = '.cache/salinas-river-finder'
const DETECTED_IMAGES_DIR = path.join(CACHE_DIR, 'detected-images')
const CSV_PATH = path.join(CACHE_DIR, 'detections.csv')
const OUTPUT_DIR = './src/assets/images/detections'
const THUMB_WIDTH = 300

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.replace(/\r/g, '').split('\n').filter(Boolean)
  const headers = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] || ''
    })
    return row
  })
}

function extractFilename(url: string): string {
  return url.split('/').pop() || ''
}

const processDetections = async (eleventyConfig: any) => {
  // Clone or pull the repo
  if (!fs.existsSync(CACHE_DIR)) {
    console.log('[process-detections] Cloning salinas-river-finder...')
    execSync(`git clone --depth 1 ${REPO_URL} ${CACHE_DIR}`, {
      stdio: 'pipe',
    })
  } else {
    console.log('[process-detections] Updating salinas-river-finder...')
    try {
      execSync('git pull', { cwd: CACHE_DIR, stdio: 'pipe' })
    } catch (err: any) {
      console.warn(
        '[process-detections] git pull failed, using cached version:',
        err.message
      )
    }
  }

  if (!fs.existsSync(CSV_PATH)) {
    console.warn('[process-detections] detections.csv not found, skipping.')
    eleventyConfig.addGlobalData('detections', [])
    return
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8')
  const rows = parseCSV(csvContent)
  const confirmed = rows.filter((row) => row.confirmed === 'True')

  console.log(
    `[process-detections] Found ${confirmed.length} confirmed detections`
  )

  const detections: Detection[] = []

  for (const row of confirmed) {
    const filename = extractFilename(row.url)
    if (!filename) continue

    const sourcePath = path.join(DETECTED_IMAGES_DIR, filename)
    if (!fs.existsSync(sourcePath)) {
      console.warn(
        `[process-detections] Image not found in detected-images: ${filename}`
      )
      continue
    }

    const outputPath = path.join(OUTPUT_DIR, filename)
    const thumbFilename = filename.replace('.jpg', '-thumb.jpg')
    const thumbPath = path.join(OUTPUT_DIR, thumbFilename)

    // Copy full image if not already present
    if (!fs.existsSync(outputPath)) {
      fs.copyFileSync(sourcePath, outputPath)
      console.log(`[process-detections] Copied ${filename}`)
    }

    // Generate thumbnail if not already present
    if (!fs.existsSync(thumbPath)) {
      try {
        await sharp(sourcePath)
          .resize({ width: THUMB_WIDTH })
          .jpeg({ quality: 70 })
          .toFile(thumbPath)
        console.log(`[process-detections] Created thumbnail ${thumbFilename}`)
      } catch (err: any) {
        console.warn(
          `[process-detections] Failed to create thumbnail for ${filename}:`,
          err.message
        )
        continue
      }
    }

    detections.push({
      originalUrl: row.url,
      datestamp: row.datestamp,
      imageUrl: `/assets/images/detections/${filename}`,
      thumbnailUrl: `/assets/images/detections/${thumbFilename}`,
    })
  }

  // Sort by datestamp descending (newest first)
  detections.sort(
    (a, b) => new Date(b.datestamp).getTime() - new Date(a.datestamp).getTime()
  )

  console.log(
    `[process-detections] Processed ${detections.length} detection images`
  )

  eleventyConfig.addGlobalData('detections', detections)
}

export default processDetections
