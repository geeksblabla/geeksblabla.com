import React from "react"
import { Query } from "react-apollo"
import EpisodeSuggestCard from "./EpisodeSuggestCard"
import Loader from "../Loader"
import { GET_EPISODES } from "./graphql"
import { Auth0Context } from "./auth0"

const EpisodesList = () => {
  const { login, user, logout } = React.useContext(Auth0Context)
  return (
    <React.Fragment>
      <button onClick={login}> login </button>
      <button onClick={logout}> login </button>
      <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return `Error! ${error.message}`

          return (
            <React.Fragment>
              {data.verifiedEpisodes.data.map(e => (
                <EpisodeSuggestCard episode={e} key={e._id} />
              ))}
            </React.Fragment>
          )
        }}
      </Query>
    </React.Fragment>
  )
}

export default EpisodesList
