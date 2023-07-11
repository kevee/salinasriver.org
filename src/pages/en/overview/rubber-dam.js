import React from 'react'
import Layout from '../../../components/layout'
import PointMap from '../../../components/map/point-map'

const EnOverviewRubberDamPage = () => (
  <Layout language="en" title="The Salinas River diversion facility">
    <p>
      <strong>AKA &quot;The Rubber Dam&quot;</strong>
    </p>
    <p>
      The rubber dam is located approximately 5 miles up river (south) of the
      Salinas river mouth. It was built to provide irrigation water and prevent
      saltwater intrusion. When the dam is raised during the dry months, it
      creates a pond up river. The planned operation of the dam is:
    </p>
    <ul>
      <li>
        <strong>November 1 to March 31</strong> — Lowered (water is flowing
        freely)
      </li>
      <li>
        <strong>April 1 to May 31</strong> — Raised. Water typically flows over
        the gates during this time.
      </li>
      <li>
        <strong>June 1 to October 31</strong> — Raised. The lagoon is full, and
        no more water flows over the dam.
      </li>
    </ul>
    <p>
      The dam can be easily portaged on river left. It has a safety bouy up
      stream, and the water above it is usually either slack or moves slowly as
      long as the river is not breached.
    </p>
    <p>
      If there is any significant flow at the{' '}
      <a href="https://waterdata.usgs.gov/monitoring-location/11152300/">
        Chualar gauge
      </a>
      , the dam is probably lowered and boaters should use caution.
    </p>
    <PointMap
      latitude={36.709082}
      longitude={-121.750659}
      zoom={9}
      caption="The location of the rubber dam."
    />
  </Layout>
)

export default EnOverviewRubberDamPage
