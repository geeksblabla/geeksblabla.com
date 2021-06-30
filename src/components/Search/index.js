import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useMemo } from "react"
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
import Result from "./result"
import Box from "./box"
import "./index.scss"
import Popup from "reactjs-popup"
import SearchIcon from "assets/search.svg"

export default function Search({ indices }) {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <Popup
      lockScroll
      contentStyle={{ border: "none" }}
      className="search-popup"
      trigger={
        <div className="search-button">
          <button className="search-button-button">
            <SearchIcon className="search-button-icon" /> Search
          </button>
        </div>
      }
      modal
    >
      {(close) => (
        <>
          <button className="close" onClick={close}>
            &times;
          </button>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            stalledSearchDelay={1000}
          >
            <Box className="sticky" />
            <Result className="result" indices={indices} />
            <div className="ais-PoweredBy">
              <span style={{ opacity: 0.5 }}> Search by Algolia</span>
            </div>
          </InstantSearch>
        </>
      )}
    </Popup>
  )
}
