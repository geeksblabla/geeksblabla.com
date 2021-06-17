import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useMemo } from "react"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"
import Result from "./result"
import Box from "./box"
import "./index.scss"

export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <Box onFocus={() => setFocus(true)} />
      {query && query.length > 0 ? (
        <Result className="result" indices={indices} />
      ) : null}
    </InstantSearch>
  )
}
