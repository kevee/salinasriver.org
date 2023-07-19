const path = require(`path`)

const languages = ['en', 'es']

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const AccessPointTemplate = path.resolve('src/templates/access-point.js')
  const result = await graphql(`
    query {
      allWaterLevel {
        nodes {
          name
          waterLevel {
            cfs
            floodLevel
            floodLink
            height
            label
            name
          }
        }
      }
      allAccessPointsYaml {
        nodes {
          slug
          tresspass
          title {
            en
            es
          }
          content {
            en
            es
          }
          directions {
            en
            es
          }
          id
          lat
          lon
          flowLow
          guage
          flowHigh
          directionsPath
        }
      }
      allTripsYaml {
        nodes {
          alert {
            en
            es
          }
          damRelease
          flowHigh
          flowLow
          gear {
            en
            es
          }
          guage
          lat
          lon
          length {
            en
            es
          }
          parts {
            en {
              caution
              title
              mile
              lon
              lat
              id
              driving
              description
            }
            es {
              title
              mile
              lon
              lat
              id
              driving
              description
              caution
            }
          }
          route
          safety {
            en
            es
          }
          setUp {
            en
            es
          }
          slug
          time {
            en
            es
          }
          title {
            en
            es
          }
          tresspass
          windAlert
        }
      }
    }
  `)
  for (const node of result.data.allAccessPointsYaml.nodes) {
    const guage = result.data.allWaterLevel.nodes.find(
      (node) => node.name === node.guage
    )
    for (const language of languages) {
      createPage({
        path: `/${language}/access-points/${node.slug}`,
        component: AccessPointTemplate,
        context: { ...node, language, guage },
      })
    }
  }
}
