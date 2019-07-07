import React from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Suggest from "../components/Suggest"

export const client = new ApolloClient({
  uri: "http://localhost:8888/.netlify/functions/db/",
})

const NotFoundPage = () => (
  <ApolloProvider client={client}>
    <Layout>
      <SEO title=" suggest new episode" />
      <Suggest />
    </Layout>
  </ApolloProvider>
)

export default NotFoundPage
