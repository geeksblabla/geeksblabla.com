const { ApolloServer, gql } = require("apollo-server-lambda")
const { createHttpLink } = require("apollo-link-http")
const fetch = require("node-fetch")
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require("graphql-tools")

const jwtDecode = require("jwt-decode")

exports.handler = async function(event, context) {
  /** required for Fauna GraphQL auth */

  if (!process.env.FAUNADB_SERVER_SECRET) {
    const msg = `
    FAUNADB_SERVER_SECRET missing.
    Did you forget to install the fauna addon or forgot to run inside Netlify Dev?
    `
    console.error(msg)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg }),
    }
  }

  // validate mutations
  const {
    body,
    headers: { authorization },
  } = event

  try {
    const { query, variables } = JSON.parse(body)
    if (query.includes("deleteEpisode") || query.includes("updateEpisode")) {
      const msg = `delete operation not allowed `
      return {
        statusCode: 500,
        body: JSON.stringify({ msg }),
      }
    }
    if (query.includes("mutation")) {
      const user = jwtDecode(authorization)
      if (
        !!variables.data &&
        !!variables.data.email &&
        user.email !== variables.data.email
      ) {
        const msg = `operation not allowed `
        return {
          statusCode: 500,
          body: JSON.stringify({ msg }),
        }
      }
    }
  } catch (error) {
    const msg = `operation not allowed `
    return {
      statusCode: 500,
      body: JSON.stringify({ msg }),
    }
  }

  ///end

  const b64encodedSecret = Buffer.from(
    process.env.FAUNADB_SERVER_SECRET + ":" // weird but they
  ).toString("base64")
  const headers = { Authorization: `Basic ${b64encodedSecret}` }

  /** standard creation of apollo-server executable schema */
  const link = createHttpLink({
    uri: "https://graphql.fauna.com/graphql", // modify as you see fit
    fetch,
    headers,
  })
  const schema = await introspectSchema(link)
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  })
  const server = new ApolloServer({
    schema: executableSchema,
  })
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args))
    server.createHandler()(event, context, cb)
  })
}
