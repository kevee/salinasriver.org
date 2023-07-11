import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../../components/layout'

const EnOverviewPrivatePropertyPage = () => (
  <Layout language="en" title="Private Property">
    <p>
      <strong>Dislcaimer</strong> this website should not be construed as, and
      it does not constitute, legal advice on any specific matter.
    </p>
    <p>
      Many established access areas are on private land which the owner has
      graciously opened for the public. All of the access points listed here are
      either public, or have clear, well-established trails that have been used
      for years.
    </p>
    <p>
      While there is confusion about whether you are allowed to actually float
      on the river,{' '}
      <a href="https://www.americanwhitewater.org/content/Wiki/stewardship:navigability">
        American Whitewater&#39;s excellent Navigability Primer
      </a>{' '}
      says:
    </p>
    <blockquote>
      <p>
        In the California court case of People v. Mack, the ruling stated, “The
        public has the right to navigate below the high water mark on rivers
        which are capable of being navigated by small recreational craft.” In
        other words, the definition of navigability in California rests on
        whether the river is capable of floating a canoe or kayak. American
        Whitewater strongly advocates this test of navigability.
      </p>
    </blockquote>
    <p>
      <em>People v. Mack</em> states:
    </p>
    <blockquote>
      <p>
        The streams of California are a vital recreational resource of the
        state. The modern determinations of the California courts, as well as
        those of several of the states, as to the test of navigability can well
        be restated as follows: members of the public have the right to navigate
        and to exercise the incidents of navigation in a lawful manner at any
        point below high water mark on waters of this state which are capable of
        being navigated by oar or motor propelled small creaft.
      </p>
    </blockquote>
    <p>
      The land surrounding the river is definitely private. Protect your access
      to the river by:
    </p>
    <ul>
      <li>Staying only on the shores of main river channels</li>
      <li>
        Only use <Link to="/en/access-points">defined access points</Link> to
        enter and exit the river
      </li>
      <li>
        Never cross over a fence to enter/access the river. There are some
        fences which cross the river. These are used to define grazing areas for
        cattle. Pass below or above these safely without damaging the fence.
      </li>
      <li>You may walk on private property to safetly portage an obstacle.</li>
      <li>Leave no trace</li>
    </ul>
  </Layout>
)

export default EnOverviewPrivatePropertyPage
