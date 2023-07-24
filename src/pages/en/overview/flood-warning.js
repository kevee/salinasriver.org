import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'
import Table from '../../../components/table'

const EnOverviewFloodWarningPage = () => {
  const data = useStaticQuery(graphql`
    {
      allWaterLevel {
        nodes {
          waterLevel {
            floodLevel
            id
            label
            floodLink
          }
          name
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { language: { eq: "en" }, slug: { eq: "flood-warning" } }
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
      <Table>
        <thead>
          <tr>
            <th>Guage</th>
            <th>Water level</th>
          </tr>
        </thead>
        <tbody>
          {data.allWaterLevel.nodes.map(({ name, waterLevel }) => (
            <tr>
              <td>
                <a href={waterLevel.floodLink}>{waterLevel.label}</a>
              </td>
              <td>{waterLevel.floodLevel} feet</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  )
}

export default EnOverviewFloodWarningPage

export const Head = () => <title>Flood warning</title>
