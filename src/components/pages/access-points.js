import React from 'react'
import Layout from '../layout'
import { Link, useStaticQuery, graphql } from 'gatsby'

const AccessPointsPage = ({ children, language }) => {
  // Sort access points from south to north
  const data = useStaticQuery(graphql`
    {
      allAccessPointsYaml(sort: { lat: ASC }) {
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
    <Layout language={language}>
      <div>{children}</div>
      <div>
        <ul>
          {data &&
            data.allAccessPointsYaml.nodes.map((node) => (
              <li key={node.slug}>
                <Link to={`/${language}/access-points/${node.slug}`}>
                  {node.title[language]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  )
}

export default AccessPointsPage
