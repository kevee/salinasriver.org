import * as React from 'react'
import Container from '../components/container'
import Layout from '../components/layout'

const IndexPage = () => {
  return (
    <Layout>
      <Container>
        <main>
          <h1>A font</h1>
          <p>
            hellos <a href="#">Link</a>
          </p>
        </main>
      </Container>
    </Layout>
  )
}

export default IndexPage
