import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import PlayIcon from "assets/play-grey.svg"
import MinutesIcon from "assets/minutes.svg"
import GuestIcon from "assets/guest.svg"

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
    <div className="container statistics">
      <div className="item">
        <h1> {episodes.length}+ </h1>
        <p>
          <PlayIcon /> Episodes
        </p>
      </div>
      <div className="item">
        <h1>{episodes.length * 93}+ </h1>
        <p>
          <MinutesIcon /> Minutes of Blabla
        </p>
      </div>
      <div className="item">
        <h1> {parseInt(episodes.length * 1.5)}+ </h1>
        <p>
          <GuestIcon /> Guests
        </p>
      </div>
    </div>
  )
}
