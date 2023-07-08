import React, { createContext } from 'react'

const LinkContext = createContext()

const LinkProvider = ({ children, language }) => {
  const l = (path) => `/${language}/${path}`

  return <LinkContext.Provider value={l}>{children}</LinkContext.Provider>
}

export { LinkProvider }

export default LinkContext
