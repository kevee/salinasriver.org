import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Layout from '../layout'
import NavList from '../nav-list'
import { translate } from '../../utils/translate'

const TripsPage = ({ children, language }) => {
  // Sort access points from south to north
  const data = useStaticQuery(graphql`
    {
      allTripsYaml(sort: { lat: ASC }) {
        nodes {
          slug
          title {
            en
            es
          }
        }
      }
    }
  `)

  return (
    <Layout language={language} title={translate('trips', language)}>
      <div>{children}</div>
      <div>
        <NavList role="navigation">
          {data &&
            data.allTripsYaml.nodes.map((node) => (
              <li key={node.slug}>
                <Link to={`/${language}/trips/${node.slug}`}>
                  {node.title[language]}
                </Link>
              </li>
            ))}
        </NavList>
      </div>
    </Layout>
  )
}

export default TripsPage
