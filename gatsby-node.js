const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)

exports.createPages = async ({graphql, actions}) => {
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

        allDatoCmsReportage {
          edges {
            node {
              slug
            }
          }
        }

        allDatoCmsProject {
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

        result
        .data
        .allDatoCmsReportage
        .edges
        .map(({node: work}) => {
          createPage({
            path: `reportage/${work.slug}`,
            component: path.resolve(`./src/templates/reportage.js`),
            context: {
              slug: work.slug
            }
          })
        })

        result
        .data
        .allDatoCmsProject
        .edges
        .map(({node: work}) => {
          createPage({
            path: `project/${work.slug}`,
            component: path.resolve(`./src/templates/project.js`),
            context: {
              slug: work.slug
            }
          })
        })

      resolve()
    })
  })
}
