import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewBradleyBridgePage = () => (
  <Layout language="en" title="Bradley Bridge Repair">
    <p>
      As of June 2022, work has begun on the{' '}
      <a href="https://ceqanet.opr.ca.gov/2019129031/2">
        Bradley Bridge Scour Repair project
      </a>
      . Several pilings of the bridge in the middle of the main river channel
      were being undercut and their foundations eroded. During construction, the
      river will be diverted around the project.
    </p>
    <p>
      During construction, you may have no access to the river. We expect the
      project to be wrapped up by Fall 2023.
    </p>
    <p>
      The <Link to="/en/access-points/bradley/">access path</Link> to the bridge
      will not be affected after construction, according to the project plans.
    </p>
  </Layout>
)

export default EnOverviewBradleyBridgePage
