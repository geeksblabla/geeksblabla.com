import React from "react"
import { Query } from "react-apollo"
import SuggestionCard from "./SuggestionCard"
import Loader from "../Loader"
import { GET_EPISODES } from "./graphql"
import { Auth0Context } from "./auth0"
const isBrowser = typeof window !== "undefined"

const normalize = data => {
  return data.verifiedEpisodes.data.sort(
    (a, b) => b.votes.data.length - a.votes.data.length
  )
}

const SuggestionsList = () => {
  const { login, user, logout, isAuthenticated, openPopup } = React.useContext(
    Auth0Context
  )
  return (
    <div className="list">
      <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return `Error! ${error.message}`

          return (
            <React.Fragment>
              {normalize(data).map(e => (
                <SuggestionCard episode={e} key={e._id} />
              ))}
            </React.Fragment>
          )
        }}
      </Query>
    </div>
  )
}

export default SuggestionsList
