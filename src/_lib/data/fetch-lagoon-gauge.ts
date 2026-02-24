import { AssetCache } from '@11ty/eleventy-fetch'
import axios from 'axios'

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

const fetchLagoonGauge = async () => {
  let asset = new AssetCache('salinas-lagoon-gauge')
  if (asset.isCacheValid('1d')) {
    return asset.getCachedValue() // a promise
  }
  console.log('Fetching Lagoon gauge data...')
  const gaugeUrl =
    'https://mcwrarealtimehydrodata.com/sensor/?site_id=6208&site=5ab71056-591d-4cd5-b4b0-2550646ff137&device_id=211&device=3bd85369-6580-41b2-bbe6-59eb64071fef'
  const gaugeResponse = await axios.get(gaugeUrl, {
    maxRedirects: 0,
    validateStatus: (status) => status === 302,
    headers: {
      // lol
      'User-Agent': userAgent,
    },
  })
  const fileUrl =
    'https://mcwrarealtimehydrodata.com/export/file/?site_id=6208&site=5ab71056-591d-4cd5-b4b0-2550646ff137&device_id=211&device=3bd85369-6580-41b2-bbe6-59eb64071fef&mode=&hours=&tz=US%2FPacific&format_datetime=%25Y-%25m-%25d+%25H%3A%25i%3A%25S&mime=txt&delimiter=comma'

  const gagueData = await axios
    .get(fileUrl, {
      headers: {
        'User-Agent': userAgent,
        Accept:
          'text/csv,application/csv,application/vnd.ms-excel,text/comma-separated-values,text/plain',
        Cookie: gaugeResponse.headers['set-cookie']?.join('; ') || '',
      },
    })
    .then((response) => response.data)

  const lines = gagueData.split('\n')
  const value = parseFloat(lines[1].split(',')[2])
  await asset.save(value, 'json')
  return value
}

export default fetchLagoonGauge
