import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

export { LIKE, DISLIKE, CREATE_NEW_EPISODE } from "./mutation"
export { GET_EPISODES } from "./queries"

export const client = new ApolloClient({
  uri: "/.netlify/functions/db/",
  fetch,
})
