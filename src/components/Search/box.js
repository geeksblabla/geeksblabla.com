import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import SearchIcon from "assets/search.svg"

export default connectSearchBox(({ refine, currentRefinement, className }) => (
  <form className={className}>
    <SearchIcon width={30} className="search-button-icon" />
    <input
      autoFocus
      className="SearchInput"
      type="text"
      placeholder="Search Blabla"
      aria-label="Search"
      onChange={(e) => refine(e.target.value)}
      // value={currentRefinement}
    />
  </form>
))
