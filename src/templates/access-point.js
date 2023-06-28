import React from 'react'
import Layout from '../components/layout'

const AccessPointTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <h1>{pageContext.title.en}</h1>
    </Layout>
  )
}

export default AccessPointTemplate
