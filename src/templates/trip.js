import React from 'react'
import Layout from '../components/layout'

const TripTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <h1>{pageContext.title.en}</h1>
    </Layout>
  )
}

export default TripTemplate
