import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewPage = () => (
  <Layout language="en" title="Overview of the Salinas River">
    <p>
      The Salinas has been called an &quot;upside down&quot; river. It flows
      south-to-north between the counties of San Luis Obispo and Monterey. It is
      in many places completely dry on the surface, but water continues to run
      deep underground.
    </p>
    <h2>
      <Link to="/en/overview/safety">Safety</Link>
    </h2>
    <p>Specific things to keep in mind when taking a trip down the Salinas.</p>
    <h2>
      <Link to="/en/overview/private-property">Private property</Link>
    </h2>
    <p>Specific things to keep in mind when taking a trip down the Salinas.</p>
    <h2>
      <Link to="/en/overview/dam-release">Dam release schedule</Link>
    </h2>
    <p>
      Much of the water between the Nacimiento river junction and the rest of
      the middle section depends on dam release from the Nacimiento and San
      Anonio reservoirs.
    </p>
    <h2>
      <Link to="/en/overview/rubber-dam">Rubber dam</Link>
    </h2>
    <p>
      The Salinas River Diversion Facility is a necessary portage in the lower
      river April through October.
    </p>
  </Layout>
)

export default EnOverviewPage
