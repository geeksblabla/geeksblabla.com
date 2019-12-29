import React from "react"
import { Link } from "gatsby"

import PlayIcon from "assets/play-grey.svg"
import MinutesIcon from "assets/minutes.svg"
import GuestIcon from "assets/guest.svg"

export default () => {
  return (
    <div className="container statistics">
      <div className="item">
        <h1> 25+ </h1>
        <p>
          <PlayIcon /> Episodes
        </p>
      </div>
      <div className="item">
        <h1> 1380+ </h1>
        <p>
          <MinutesIcon /> Minutes of Blabla
        </p>
      </div>
      <div className="item">
        <h1> 2O+ </h1>
        <p>
          <GuestIcon /> Guests
        </p>
      </div>
    </div>
  )
}
