import React, { createContext } from 'react'
import strings from '../data/strings.json'
import { get } from 'lodash'

const TranslateContext = createContext()

const TranslateProvider = ({ children, language }) => {
  const t = (key) => get(strings, `${key}.${language}`, key)

  return (
    <TranslateContext.Provider value={t}>{children}</TranslateContext.Provider>
  )
}

export { TranslateProvider }

export default TranslateContext
