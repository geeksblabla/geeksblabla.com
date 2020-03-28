import React from "react"
// import { Link } from "gatsby"
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
              In Moroccan Success Story episodes, we invite a Moroccan icon in
              the IT and related fields, to share their experiences, lessons
              learned and knowledge with the Moroccan community.
            </p>
          </div>
          <Mss className="crea" />
        </div>
        <div className="item">
          <Tech className="crea" />
          <div>
            <h1> Tech Episodes </h1>
            <p>
              An open, deep dive discussion around anything and everything
              related to programming & software engineering, Tech and everything
              in between.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
