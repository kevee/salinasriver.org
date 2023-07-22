import React, { createContext } from 'react'
import strings from '../data/strings.json'
import { get } from 'lodash'

const TranslateContext = createContext()

const translate = (key, language) => get(strings, `${key}.${language}`, key)

const TranslateProvider = ({ children, language }) => {
  const t = (key) => translate(key, language)

  return (
    <TranslateContext.Provider value={t}>{children}</TranslateContext.Provider>
  )
}

export { TranslateProvider, translate }

export default TranslateContext
