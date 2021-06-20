import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
export default connectSearchBox(({ refine, currentRefinement, className }) => (
  <form className={className}>
    <input
      className="SearchInput "
      type="text"
      placeholder="Search Blabla"
      aria-label="Search"
      onChange={(e) => refine(e.target.value)}
      value={currentRefinement}
    />
  </form>
))
