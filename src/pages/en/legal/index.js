import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'

const EnLegalPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { language: { eq: "en" }, slug: { eq: "legal" } }
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
    <Layout language="en" title={frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default EnLegalPage

export const Head = () => <title>Legal</title>
