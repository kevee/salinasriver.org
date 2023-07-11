import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewSafetyPage = () => (
  <Layout language="en" title="Safety">
    <p>
      Enjoying the Salinas River at public access points is both safe and fun,
      but certain activities carry more risk than others. Make sure to also be
      aware of your{' '}
      <Link to="/en/overview/private-property">
        rights and responsibilities involving private property
      </Link>
      . Whatever your activity, make sure to{' '}
      <a href="https://www.paddlewise.org/" target="_blank" rel="noreferrer">
        follow paddle-wise principles
      </a>
      .
    </p>
    <h2>River mouth breach</h2>
    <p>
      During flood events and high water, the county will sometimes breach the
      Salinas River mouth, allowing the river to flow to the ocean. Taking the
      river all the way to the ocean is **extremely dangerous**, ending with
      large standing waves and a strong current. Do not attempt to take the
      river to the ocean.
    </p>
    <h2>Water quality</h2>
    <p>
      The Salinas can contain agricultural runoff that is difficult to
      completely filter with a standard backpacking filter. The water is also
      very silty. Bring enough drinking water for your entire trip.
    </p>
    <h2>Dogs</h2>
    <p>
      Several sections of the river are surrounded by ranch land. Cows can graze
      the banks and the main channel of the river. If your dog would chase a
      cow, make sure to keep it under your control.
    </p>
    <h2>Strainers</h2>
    <p>
      The most common form of danger on the river is low trees and brush that
      are found along the banks. Make sure you know how to safely prevent or
      exit a strainer situation.
    </p>
  </Layout>
)

export default EnOverviewSafetyPage
