import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../../../components/layout'
import Table from '../../../components/table'

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
    }
  `)

  return (
    <Layout language="en" title="Nacimiento and San Antonio release schedule">
      <p>
        Most of the water-related activities on the southern Salinas depend on
        dam release from the Nacimiento reservoir, and to a lesser extent the
        San Antonio reservoir. While you can get{' '}
        <a href="https://waterdata.usgs.gov/nwis/uv?site_no=11150500">
          real-time flow information from the USGS
        </a>
        , if you are planning a trip in the future you should consider the
        following dam release sechedule.
      </p>
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
      <p>
        The water flows down the Nacimiento and San Antonio Rivers, both of
        which join up with the Salinas just south of the town of Bradley. When
        the{' '}
        <a href="https://waterdata.usgs.gov/nwis/uv?site_no=11150500">
          river guage at Bradley
        </a>{' '}
        is over 400 cfs (it is currently{' '}
        <strong>{data.allWaterLevel.nodes[0].waterLevel.cfs} cfs</strong>), the
        water can sometimes reach beyond King City.
      </p>
    </Layout>
  )
}

export default EnOverviewDamReleasePage
