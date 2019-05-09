const path = require("path")
const _ = require("lodash")
const blablasQuery = require("./queries/blablas")
//const paginate = require("gatsby-awesome-pagination")
//const PAGINATION_OFFSET = 7

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node

    const pagePath = "blablas/" + _.kebabCase(node.title)

    if (node.redirects) {
      node.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/blabla.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === `BlablasYaml`) {
    createNodeField({
      name: "slug",
      node,
      value: "blablas/" + _.kebabCase(node.title),
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  try {
    const {
      data: { blablas },
      errors,
    } = await graphql(blablasQuery)
    if (errors) {
      throw new Error(errors)
    }

    if (_.isEmpty(blablas)) {
      throw new Error("There are no posts!")
    }

    const { edges } = blablas
    const { createRedirect, createPage } = actions
    createPosts(createPage, createRedirect, edges)
  } catch (err) {
    console.log(err)
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        $components: path.resolve(__dirname, "src/components"),
      },
    },
  })
}
