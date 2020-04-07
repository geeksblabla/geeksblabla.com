import React from "react"
import { Query } from "react-apollo"
import SuggestionCard from "./SuggestionCard"
import Loader from "../Loader"
import { GET_EPISODES } from "./graphql"

const normalize = (data) => {
  return data.verifiedEpisodes.data
    .filter((e) => !e.done) // TODO: add it to query instead of a simple filter
    .sort((a, b) => b.votes.data.length - a.votes.data.length)
}

const SuggestionsList = () => {
  return (
    <div className="list">
      <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />
          if (error) return `Error! ${error.message}`

          return (
            <React.Fragment>
              {normalize(data).map((e) => (
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
