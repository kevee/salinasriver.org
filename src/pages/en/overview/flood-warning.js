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
    }
  `)
  return (
    <Layout language="en" title="Flood warning">
      <p>
        This website is updated several times a day with data from USGS water
        guages. If any of these guages cross a defined threshold by NOAA, we
        automatically place a warning on every page of the site. We use the
        below water levels to tests if any guage is approaching flood stage.
      </p>
      <p>
        All of these water levels are a few feet lower than the
        &quot;Action&quot; stage of the guage. For example, the{' '}
        <a href="https://water.weather.gov/ahps2/hydrograph.php?wfo=mtr&gage=sprc1">
          yellow water level in the Spreckles gauge
        </a>
        .
      </p>
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
