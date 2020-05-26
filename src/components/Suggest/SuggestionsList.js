import React from "react"
import { useQuery, gql } from "@apollo/client"

import SuggestionCard from "./SuggestionCard"
import Loader from "../Loader"
import { GET_EPISODES } from "./graphql"

const normalize = (data) => {
  return data.verifiedEpisodes.data
    .filter((e) => !e.done) // TODO: add it to query instead of a simple filter
    .sort((a, b) => b.votes.data.length - a.votes.data.length)
}

const SuggestionsList = () => {
  const { loading, error, data } = useQuery(GET_EPISODES, {
    fetchPolicy: "network-only",
  })

  if (loading) return <Loader />
  if (error) return `Error! ${error.message}`

  return (
    <React.Fragment>
      {normalize(data).map((e) => (
        <SuggestionCard episode={e} key={e._id} />
      ))}
    </React.Fragment>
  )
}

export default SuggestionsList
