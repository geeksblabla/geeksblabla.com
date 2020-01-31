import React from "react"
import { Link } from "gatsby"

import PlayIcon from "assets/play.svg"
import HeroImage from "assets/hero.svg"

export default () => {
  return (
    <div className="container hero">
      <div className="description">
        <h1> Tech Topics In Darija </h1>
        <p>
          We are Developer Circles Casablanca community, we believe in community
          and sharing knowladge
        </p>
        <div className="actions">
          <Link to="/blablas" className="button left">
            <PlayIcon /> Start Watching
          </Link>
          {/* <Link to="/suggest-new-episode" className="button outline">
            Suggest a topic
          </Link> */}
        </div>
      </div>
      <HeroImage className="crea" />
    </div>
  )
}
