import React from 'react'
import Layout from '../../../components/layout'

const EnLegalAccessibiltyPage = () => {
  return (
    <Layout language="en">
      <h1>Accessibility Statement</h1>
      <p>
        The Salinas River Recreation Guide authors are committed to ensuring
        digital accessibility for people with disabilities. We are continually
        improving the user experience for everyone, and applying the relevant
        accessibility standards.
      </p>
      <h2>Conformance status</h2>
      <p>
        The Web Content Accessibility Guidelines (WCAG) defines requirements for
        designers and developers to improve accessibility for people with
        disabilities. It defines three levels of conformance: Level A, Level AA,
        and Level AAA. This website is fully conformant with WCAG 2.1 level AA.
        Fully conformant means that the content fully conforms to the
        accessibility standard without any exceptions.
      </p>
      <h2>Technical specifications</h2>
      <p>
        Accessibility of the website relies on the following technologies to
        work with the particular combination of web browser and any assistive
        technologies or plugins installed on your computer:
      </p>
      <ul>
        <li>HTML</li>
        <li>WAI-ARIA</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <p>
        These technologies are relied upon for conformance with the
        accessibility standards used.
      </p>
      <h2>Limitations and alternatives</h2>
      <p>
        Despite our best efforts to ensure accessibility of the website, there
        may be some limitations. Below is a description of known limitations,
        and potential solutions. Please contact us if you observe an issue not
        listed below.
      </p>
      <ul>
        <li>Maps are replaced by tables of data for screen-reader users</li>
      </ul>
      <p>
        We welcome your feedback on the accessibility of this website. If you
        encounter accessibility barriers, please contact us at
        hello@salinasriver.org.
      </p>
      <p>
        We try to respond to feedback within 5 business days, and to propose a
        solution within 10 business days.
      </p>
    </Layout>
  )
}

export default EnLegalAccessibiltyPage
