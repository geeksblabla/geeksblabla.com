import React from "react"
import { Link } from "gatsby"

import PlayIcon from "assets/play.svg"

export default () => {
  return (
    <div className="container hero">
      <h1> Tech Topics In Darija </h1>
      <p>
        We are Developer Circles Casablanca community, we believe in community
        and sharing knowladge
      </p>
      <div className="actions">
        <Link to="/blablas" className="button">
          <PlayIcon /> Start Watching
        </Link>
        <Link to="/blablas" className="button outline">
          Suggest a topic
        </Link>
      </div>
    </div>
  )
}
