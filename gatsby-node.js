const path = require(`path`)

const languages = ['en', 'es']

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const AccessPointTemplate = path.resolve('src/templates/access-point.js')
  const result = await graphql(`
    query {
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
          directionsPath {
            features {
              geometry {
                coordinates
                type
              }
              type
            }
            type
          }
        }
      }
    }
  `)
  for (const node of result.data.allAccessPointsYaml.nodes) {
    for (const language of languages) {
      createPage({
        path: `/${language}/access-point/${node.slug}`,
        component: AccessPointTemplate,
        context: node,
      })
    }
  }
}
