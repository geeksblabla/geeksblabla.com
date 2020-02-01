import React from "react"
import { Link } from "gatsby"

import Mss from "assets/mss.svg"
import Tech from "assets/tech.svg"
import "./index.scss"

export default () => {
  return (
    <div className="episodes-types">
      <div className="container">
        <div className="item reverse">
          <div>
            <h1> MSS Episodes </h1>
            <p>
              In this episode of GeeksBlabla, our guests discuss how we can
              empower women in moroccan.
            </p>
          </div>
          <Mss className="crea" />
        </div>
        <div className="item">
          <Tech className="crea" />
          <div>
            <h1> Tech Episodes </h1>
            <p>
              In this episode of GeeksBlabla, our guests discuss how we can
              empower women in moroccan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
