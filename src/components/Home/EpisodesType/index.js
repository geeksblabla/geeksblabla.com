import React from "react"
// import { Link } from "gatsby"
import MssLight from "assets/mss_light.svg"
import Mss from "assets/mss.svg"
import Tech from "assets/tech.svg"
import TechLight from "assets/tech_light.svg"
import "./index.scss"
import pattern from "assets/patterns/5.back.svg"
import patternDark from "assets/patterns/2.back.svg"
import { useTheme } from "../../Theme/ThemeContext"

export default () => {
  const { dark } = useTheme()

  return (
    <div
      className="episodes-types"
      style={{
        backgroundImage: `url(${dark ? patternDark : pattern})`,
      }}
    >
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
          {dark ? <Mss className="crea" /> : <MssLight className="crea" />}
        </div>
        <div className="item">
          {dark ? <Tech className="crea" /> : <TechLight className="crea" />}
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
