const fs = require('fs')
const path = require('path')
const set = require('lodash.set')
const get = require('lodash.get')
const yamlFront = require('yaml-front-matter')
let i18n = require('../_data/i18n/index.js')
const { stringify } = require('yaml')

const translate = fs.readFileSync('./translate_es-mx.txt', 'utf8').toString()

const strings = []
let current = false
for (const line of translate.split('\n')) {
  if (line.trim().startsWith('[[[|') && line.trim().endsWith('|]]]')) {
    current = line.trim().replace(/(\[|\]|\|)/g, '')
    continue
  }
  if (current) {
    const index = strings.findIndex((s) => s.key === current)
    if (index !== -1) {
      strings[index].value += '\n' + line
    } else {
      strings.push({
        key: current,
        value: line,
      })
    }
  }
}

const yamlToString = (data) => `---
${stringify({ ...data, __content: undefined })}
---
${data.__content}`

for (const string of strings) {
  const key = string.key.split('/')
  if (key[0] === 'i18n') {
    value = get(i18n, key[1])
    if (typeof value !== 'undefined') {
      value.es = string.value.trim()
      if (value.es) {
        i18n = set(i18n, key[1], { ...value })
      }
    }
  }
  if (key[0] === 'accessPoints') {
    const file = fs
      .readFileSync(`./src/es/access-points/${key[1]}.md`, 'utf8')
      .toString()
    const front = yamlFront.loadFront(file)
    if (key[2] === 'title') {
      front.title = string.value.trim()
      fs.writeFileSync(
        `./src/es/access-points/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
    if (key[2] === 'directions') {
      front.directions = string.value.trim()
      fs.writeFileSync(
        `./src/es/access-points/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
    if (key[2] === 'content') {
      front.__content = string.value
      fs.writeFileSync(
        `./src/es/access-points/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
  }

  if (key[0] === 'overview') {
    const file = fs
      .readFileSync(`./src/es/overview/${key[1]}.md`, 'utf8')
      .toString()
    const front = yamlFront.loadFront(file)
    if (key[2] === 'title') {
      front.title = string.value.trim()
      fs.writeFileSync(
        `./src/es/overview/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
    if (key[2] === 'content') {
      front.__content = string.value
      fs.writeFileSync(
        `./src/es/overview/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
  }

  if (key[0] === 'legal') {
    const file = fs
      .readFileSync(`./src/es/legal/${key[1]}.md`, 'utf8')
      .toString()
    const front = yamlFront.loadFront(file)
    if (key[2] === 'title') {
      front.title = string.value.trim()
      fs.writeFileSync(
        `./src/es/legal/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
    if (key[2] === 'content') {
      front.__content = string.value
      fs.writeFileSync(
        `./src/es/legal/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
  }

  if (key[0] === 'trip') {
    const file = fs
      .readFileSync(`./src/es/trips/${key[1]}.md`, 'utf8')
      .toString()
    const front = yamlFront.loadFront(file)
    if (key[2] === 'title') {
      front.title = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
    if (key[2] === 'alert') {
      front.alert = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'gear') {
      front.gear = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'setUp') {
      front.setUp = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'safety') {
      front.safety = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'parts' && key[4] === 'title') {
      front.parts[key[3]].title = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'parts' && key[4] === 'description') {
      front.parts[key[3]].description = string.value.trim()
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }

    if (key[2] === 'content') {
      front.__content = string.value
      fs.writeFileSync(
        `./src/es/trips/${key[1]}.md`,
        yamlToString(front),
        'utf8'
      )
    }
  }
}

fs.writeFileSync(
  './src/_data/i18n/index.js',
  `module.exports = ${JSON.stringify(i18n, null, 2)}`,
  'utf8'
)
