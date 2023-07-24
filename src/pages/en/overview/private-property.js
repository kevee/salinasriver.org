import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewPrivatePropertyPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            language: { eq: "en" }
            slug: { eq: "private-property" }
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

export default EnOverviewPrivatePropertyPage

export const Head = () => <title>Private property</title>
