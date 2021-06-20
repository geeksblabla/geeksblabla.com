import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState, useMemo } from "react"
import { InstantSearch, PoweredBy } from "react-instantsearch-dom"
import Result from "./result"
import Box from "./box"
import "./index.scss"
import Modal from "react-modal"
import SearchIcon from "assets/search.svg"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    height: "70vh",
    backgroundColor: "#111233",
  },
}

export default function Search({ indices }) {
  const rootRef = createRef()
  const [query, setQuery] = useState()
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <div className="search-container">
        <div onClick={openModal}>
          <SearchIcon style={{ width: "20px", fill: "#aaaaaa" }} />
          <span>Search a Blablas</span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <div className="close" onClick={() => setIsOpen(false)}>
            {" "}
            X{" "}
          </div>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <Box className="sticky" />
            {query && query.length > 0 ? (
              <Result className="result" indices={indices} />
            ) : null}
            <PoweredBy />
          </InstantSearch>
        </div>
      </Modal>
    </>
  )
}
