const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsNorthpond {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result
        .data
        .allDatoCmsNorthpond
        .edges
        .map(({node: work}) => {
          createPage({
            path: `northpond/${work.slug}`,
            component: path.resolve(`./src/templates/northpond.js`),
            context: {
              slug: work.slug
            }
          })
        })
      resolve()
    })
  })
}
