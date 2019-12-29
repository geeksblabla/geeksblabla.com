import React from "react"
import { Link } from "gatsby"

import Mss from "assets/mss.svg"
import Tech from "assets/tech.svg"

export default () => {
  return (
    <div className="container episodes-types">
      <div className="item">
        <div>
          <h1> MSS Episodes </h1>
          <p>
            In this episode of GeeksBlabla, our guests discuss how we can
            empower women in moroccan.
          </p>
        </div>
        <Mss />
      </div>
      <div className="item">
        <Tech />
        <div>
          <h1> Tech Episodes </h1>
          <p>
            In this episode of GeeksBlabla, our guests discuss how we can
            empower women in moroccan.
          </p>
        </div>
      </div>
    </div>
  )
}
