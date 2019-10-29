import fetch from "isomorphic-fetch"
import { ApolloClient, InMemoryCache } from "apollo-boost"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const isBrowser = typeof window !== "undefined"

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (isBrowser && localStorage.getItem("token")) || null
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  }
})

const uri = "/.netlify/functions/db/"
export const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri })),
  cache: new InMemoryCache(),
  fetch,
})

export { LIKE, DISLIKE, CREATE_NEW_EPISODE } from "./mutation"
export { GET_EPISODES, MY_VOTES } from "./queries"
