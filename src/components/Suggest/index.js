import React from "react"
import { ApolloProvider } from "@apollo/client"
import SuggestionsList from "./SuggestionsList"
import SuggestionForm from "./SuggestionForm"
import { client } from "./graphql"
import { Auth0Provider } from "./auth0"
import "./index.scss"

export default () => {
  return (
    <ApolloProvider client={client}>
      <Auth0Provider>
        <div className=" container suggest">
          <SuggestionForm />
          <div className="list">
            <SuggestionsList />
          </div>
        </div>
      </Auth0Provider>
    </ApolloProvider>
  )
}
