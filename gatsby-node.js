require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require("path")

const fetch = require("node-fetch")

const _ = require("lodash")
//const paginate = require("gatsby-awesome-pagination")
//const PAGINATION_OFFSET = 7
const fs = require("fs")
//const contributers = require("./.all-contributorsrc")

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node

    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach((fromPath) => {
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

exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { published: { ne: false } } }
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              parent {
                ... on File {
                  name
                  sourceInstanceName
                }
              }
              excerpt(pruneLength: 250)
              fields {
                title
                slug
                date
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const { edges } = result.data.allMdx
  const { createRedirect, createPage } = actions
  createPosts(createPage, createRedirect, edges)
}

const viewsFormatter = (num) => {
  return num > 999 ? `${(num / 1000).toFixed(1)}k` : `${num}`
}

const getVideoViewsCount = async (videoId) => {
  // Some episodes don't have a video field in the frontmatter
  if (!videoId) return

  const accessToken = `${process.env.FB_PAGE_ACCESS_TOKEN}`
  const data = await fetch(
    `https://graph.facebook.com/v7.0/${videoId}/video_insights?metric=total_video_views&access_token=${accessToken}`
  ).then((res) => res.json())

  // For episodes created in the DevC group, return a random number from 2k to 4k
  if (data.error) {
    return Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000
  }

  return data.data[0].values[0].value
}

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split("-"), 3), "-")

    const slug = "blablas/" + _.kebabCase(node.frontmatter.title)

    createNodeField({
      name: "id",
      node,
      value: node.id,
    })

    createNodeField({
      name: "published",
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: "slug",
      node,
      value: slug,
    })

    createNodeField({
      name: "date",
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(" ")[0] : "",
    })
    createNodeField({
      name: "duration",
      node,
      value: node.frontmatter.duration ? node.frontmatter.duration : "01:00",
    })

    createNodeField({
      name: "tags",
      node,
      value: node.frontmatter.tags || [],
    })
    createNodeField({
      name: "featured",
      node,
      value: node.frontmatter.featured || false,
    })
    const path =
      node.fileAbsolutePath.substring(
        node.fileAbsolutePath.indexOf(
          "/",
          node.fileAbsolutePath.indexOf("blablas")
        )
      ) || ""

    createNodeField({
      name: "repoLink",
      node,
      value: `https://github.com/DevC-Casa/geeksblabla.com/tree/master/blablas${path}`,
    })
    createNodeField({
      name: "url",
      node,
      value:
        node.frontmatter.url ||
        "https://www.facebook.com/groups/DevC.Casablanca/",
    })
    createNodeField({
      name: "video",
      node,
      value: node.frontmatter.video || "",
    })

    const views = await getVideoViewsCount(node.frontmatter.video)

    createNodeField({
      name: "views",
      node,
      value: viewsFormatter(views) || "0",
    })

    createNodeField({
      name: "audio",
      node,
      value: node.frontmatter.audio || "",
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
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

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  let data = JSON.parse(fs.readFileSync("./.all-contributorsrc", "utf-8"))

  data.contributors.forEach((contributor) => {
    const name = contributor.name.replace(/\s+/g, " ").trim().split(" ")
    const node = {
      firstName: name[0],
      lastName:
        name.length === 3
          ? `${name[1]} ${name[2]}`
          : name.length === 2
          ? name[1]
          : "",
      ...contributor,
      id: createNodeId(`contributor-${contributor.login}`),
      internal: {
        type: "Contributor",
        contentDigest: createContentDigest(contributor),
      },
    }

    // Create the actual data node
    actions.createNode(node)
  })
}
