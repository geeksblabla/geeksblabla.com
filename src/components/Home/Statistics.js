import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import EpisodesIcon from "assets/episodes.svg"
import MinutesIcon from "assets/minutes.svg"
import GuestIcon from "assets/guest.svg"
import Back from "assets/stats_item.svg"

const query = graphql`
  {
    allMdx {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default () => {
  const data = useStaticQuery(query)
  const episodes = data.allMdx.edges
  return (
    <div className="statistics">
      <div className="container">
        <div className="item">
          <EpisodesIcon />
          <div>
            <h1> {episodes.length}+ </h1>
            <p>Episodes</p>
          </div>
        </div>
        <div className="item">
          <MinutesIcon />
          <div>
            <h1>{episodes.length * 93}+ </h1>
            <p>Minutes of Blabla</p>
          </div>
        </div>
        <div className="item">
          <GuestIcon />
          <div>
            <h1> {parseInt(episodes.length * 1.5)}+ </h1>
            <p>Guests</p>
          </div>
        </div>
      </div>
    </div>
  )
}
