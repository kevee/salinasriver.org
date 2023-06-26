import React from 'react'
import GlobalStyles from './global-styles'

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  )
}

export default Layout
