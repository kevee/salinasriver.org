import React from 'react'
import GlobalStyles from './global-styles'
import { TranslateProvider, translate } from '../../utils/translate'
import { LinkProvider } from '../../utils/link'
import FloodWarning from './flood-warning'
import Footer from './footer'
import Header from './header'
import Container from '../container'
import SkipNav from './skip-nav'
import Breadcrumbs from './breadcrumbs'

const Layout = ({ children, language, title, breadcrumbs = false }) => {
  return (
    <TranslateProvider language={language}>
      <LinkProvider language={language}>
        <GlobalStyles />
        <SkipNav to="#main" />
        <Header language={language} />
        <FloodWarning />
        <Container topMargin>
          <Breadcrumbs
            title={title}
            crumbs={[
              { link: `/${language}/`, title: translate('home', language) },
              ...(breadcrumbs || []),
            ]}
          />
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
