import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'
import Table from '../../../components/table'
import PointMap from '../../../components/map/point-map'

const EnOverviewDamReleasePage = () => {
  const data = useStaticQuery(graphql`
    {
      allWaterLevel(filter: { name: { eq: "bradley" } }) {
        nodes {
          waterLevel {
            cfs
          }
          name
        }
      }
      allDamReleaseYaml {
        nodes {
          year
          link
          schedule {
            month
            release
          }
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { language: { eq: "en" }, slug: { eq: "dam-release" } }
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
            <th>Month</th>
            <th>
              Combined release (<abbr title="Cubic-feet per second">cfs</abbr>)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.allDamReleaseYaml.nodes[0].schedule.map(
            ({ month, release }) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{release}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <p>
        <small>
          From the{' '}
          <a href={data.allDamReleaseYaml.nodes[0].link}>
            Monterey County Water Resources Agency{' '}
            {data.allDamReleaseYaml.nodes[0].year} release schedule
          </a>
          . CFS is defined as &quot;Mean daily flow for the month.&quot;
        </small>
      </p>

      <PointMap
        latitude={35.832921}
        longitude={-120.756226}
        zoom={9}
        caption="Where the Nacimiento joins up with the Salinas."
      />
    </Layout>
  )
}

export default EnOverviewDamReleasePage

export const Head = () => <title>Dam release</title>
