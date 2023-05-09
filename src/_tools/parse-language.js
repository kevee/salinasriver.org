const fs = require('fs')
const path = require('path')
const { parse } = require('yaml')
const get = require('lodash.get')
const glob = require('glob-promise')
const yamlFront = require('yaml-front-matter')
const i18n = require('../_data/i18n/index.js')

;(async () => {
  const strings = []
  Object.keys(i18n).forEach((key) => {
    if (typeof i18n[key].en === 'undefined') {
      Object.keys(i18n[key]).forEach((second) => {
        strings.push(`${key}.${second}`)
      })
    } else {
      strings.push(key)
    }
  })

  const toTranslate = []

  for (const name of strings) {
    toTranslate.push({
      name: `i18n/${name}`,
      value: get(i18n, name).en,
    })
  }

  const accessPoints = await glob('src/en/access-points/*.md')
  for (const accessPoint of accessPoints) {
    const contents = fs.readFileSync(accessPoint, 'utf8').toString()
    const data = yamlFront.loadFront(contents)
    toTranslate.push({
      name: `accessPoints/${path.basename(accessPoint, '.md')}/title`,
      value: data.title,
    })
    toTranslate.push({
      name: `accessPoints/${path.basename(accessPoint, '.md')}/directions`,
      value: data.directions,
    })
    toTranslate.push({
      name: `accessPoints/${path.basename(accessPoint, '.md')}/content`,
      value: data.__content,
    })
  }

  const overview = await glob('src/en/overview/*.md')
  for (const over of overview) {
    const contents = fs.readFileSync(over, 'utf8').toString()
    const data = yamlFront.loadFront(contents)
    toTranslate.push({
      name: `overview/${path.basename(over, '.md')}/title`,
      value: data.title,
    })
    toTranslate.push({
      name: `overview/${path.basename(over, '.md')}/content`,
      value: data.__content,
    })
  }

  const legal = await glob('src/en/legal/*.md')
  for (const leg of legal) {
    const contents = fs.readFileSync(leg, 'utf8').toString()
    const data = yamlFront.loadFront(contents)
    toTranslate.push({
      name: `legal/${path.basename(leg, '.md')}/title`,
      value: data.title,
    })
    toTranslate.push({
      name: `legal/${path.basename(leg, '.md')}/content`,
      value: data.__content,
    })
  }

  const trips = await glob('src/en/trips/*.md')
  for (const trip of trips) {
    const contents = fs.readFileSync(trip, 'utf8').toString()
    const data = yamlFront.loadFront(contents)
    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/title`,
      value: data.title,
    })

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/alert`,
      value: data.alert,
    })

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/gear`,
      value: data.gear,
    })

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/setUp`,
      value: data.setUp,
    })

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/safety`,
      value: data.safety,
    })

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/alert`,
      value: data.alert,
    })
    if (data.parts) {
      for (const [index, part] of Object.entries(data.parts)) {
        toTranslate.push({
          name: `trip/${path.basename(trip, '.md')}/parts/${index}/title`,
          value: part.title,
        })

        toTranslate.push({
          name: `trip/${path.basename(trip, '.md')}/parts/${index}/description`,
          value: part.description,
        })
      }
    }

    toTranslate.push({
      name: `trip/${path.basename(trip, '.md')}/content`,
      value: data.__content,
    })
  }

  fs.writeFileSync(
    './translate.txt',
    toTranslate
      .filter((t) => t.value)
      .map((t) => `[[[|${t.name}|]]]\n${t.value}`)
      .join('\n\n')
  )
})()
