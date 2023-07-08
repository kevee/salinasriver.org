import React from 'react'
import Layout from '../layout'

const IndexPage = ({ children, language }) => {
  return (
    <Layout language={language}>
      <div>{children}</div>
    </Layout>
  )
}

export default IndexPage
