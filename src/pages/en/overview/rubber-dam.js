import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'
import PointMap from '../../../components/map/point-map'

const EnOverviewRubberDamPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { language: { eq: "en" }, slug: { eq: "rubber-dam" } }
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
      <PointMap
        latitude={36.709082}
        longitude={-121.750659}
        zoom={9}
        caption="The location of the rubber dam."
      />
    </Layout>
  )
}

export default EnOverviewRubberDamPage
