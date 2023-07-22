import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewBradleyPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            language: { eq: "en" }
            slug: { eq: "bradley-bridge-repair" }
          }
        }
      ) {
        nodes {
          frontmatter {
            title
            language
            slug
          }
          html
        }
      }
    }
  `)
  const { frontmatter, html } = data.allMarkdownRemark.nodes[0]
  return (
    <Layout
      language="en"
      title={frontmatter.title}
      breadcrumbs={[{ link: '/en/overview', title: 'Overview' }]}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default EnOverviewBradleyPage
