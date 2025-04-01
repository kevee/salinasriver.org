import fs from 'node:fs'
import path from 'node:path'
import i18next from 'i18next'

const resources = {}
const localesDir = path.join(process.cwd(), 'src', '_data', 'locales')

// Read all JSON files in the locales directory
if (fs.existsSync(localesDir)) {
  fs.readdirSync(localesDir).forEach((file) => {
    if (file.endsWith('.json')) {
      const locale = file.replace('.json', '')
      const content = fs.readFileSync(path.join(localesDir, file), 'utf8')
      resources[locale] = { translation: JSON.parse(content) }
    }
  })
}

i18next.init({
  lng: 'en',
  resources,
})
