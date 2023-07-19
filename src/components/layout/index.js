import React from 'react'
import GlobalStyles from './global-styles'
import { TranslateProvider } from '../../utils/translate'
import { LinkProvider } from '../../utils/link'
import FloodWarning from './flood-warning'
import Footer from './footer'
import Header from './header'
import Container from '../container'
import SkipNav from './skip-nav'

const Layout = ({ children, language, title }) => {
  return (
    <TranslateProvider language={language}>
      <LinkProvider language={language}>
        <GlobalStyles />
        <SkipNav to="#main" />
        <Header language={language} />
        <FloodWarning />
        <Container topMargin>
          <main id="main">
            {title && <h1>{title}</h1>}
            {children}
          </main>
        </Container>
        <Footer />
      </LinkProvider>
    </TranslateProvider>
  )
}

export default Layout
