import React, { useEffect, useState } from "react"
import { ApolloProvider } from "react-apollo"
import "./index.scss"
import EpisodesList from "./EpisodesList"
import NewEpisode from "./NewEpisode"
import { client } from "./graphql"
import { Auth0Provider } from "./auth0"

export default () => {
  return (
    <ApolloProvider client={client}>
      <Auth0Provider>
        <div className="suggest">
          <NewEpisode />
          <EpisodesList />
        </div>
      </Auth0Provider>
    </ApolloProvider>
  )
}
