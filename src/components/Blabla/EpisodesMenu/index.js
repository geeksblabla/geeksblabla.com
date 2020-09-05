import React from "react"
import AllEpisodesMenu from "../AllEpisodesMenu"
import FilteredEpisodes from "../FilteredEpisodes"
import "./index.scss"

/**
 * The EpisodesMenu is now only responsible for making one of the two decisions:
 * 1. Render the FilteredEpisodes component that contains the list of "filtered" episodes based on the category selected by the user
 * 2. Render the AllEpisodesMenu component that makes a static GraphQL query to fetch all episodes and display them ...
 * ...(just like it was implemented before supporting categories).
 * The above decision is made based on whether the component receives a `category` prop.
 * The idea is to reuse both the markup and styles of the EpisodesMenu component, because in both cases, episode items have...
 * ...the same styling and markup.
 */

export default (props) => (
  <ul className="episodes-list">
    {props.category ? (
      <FilteredEpisodes {...props} />
    ) : (
      <AllEpisodesMenu {...props} />
    )}
  </ul>
)
