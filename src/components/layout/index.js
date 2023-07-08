import React from 'react'
import GlobalStyles from './global-styles'
import { TranslateProvider } from '../../utils/translate'
import { LinkProvider } from '../../utils/link'
import Footer from './footer'

const Layout = ({ children, language }) => {
  return (
    <TranslateProvider language={language}>
      <LinkProvider language={language}>
        <GlobalStyles />
        {children}
        <Footer />
      </LinkProvider>
    </TranslateProvider>
  )
}

export default Layout
