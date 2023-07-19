import React from 'react'
import Layout from '../layout'
import HomepageMap from './homepage/map'

const IndexPage = ({ children, language }) => {
  return (
    <Layout language={language}>
      <div>{children}</div>
      <HomepageMap width={960} height={500} />
    </Layout>
  )
}

export default IndexPage
