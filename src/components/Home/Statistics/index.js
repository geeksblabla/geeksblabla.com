import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import EpisodesIcon from "assets/episodes.svg"
import EpisodesIconLight from "assets/episodes_light.svg"
import MinutesIcon from "assets/minutes.svg"
import MinutesIconLight from "assets/minutes_light.svg"
import GuestIcon from "assets/guest.svg"
import GuestIconLight from "assets/guest_light.svg"
import patternDark from "assets/patterns/1.back.svg"
import patternLight from "assets/patterns/4.back.svg"
import backGroundLight from "assets/stats_light.back.svg"
import backGroundDark from "assets/stats_item.back.svg"
import { useTheme } from "../../Theme/ThemeContext"
import "./index.scss"

const query = graphql`
  {
    allMdx(
      filter: {
        frontmatter: { published: { eq: true }, isNext: { eq: false } }
      }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

export default () => {
  const { dark } = useTheme()
  const data = useStaticQuery(query)
  const episodes = data.allMdx.edges

  const backGroundShape = {
    backgroundImage: `url(${dark ? backGroundDark : backGroundLight})`,
  }

  return (
    <div
      className="statistics"
      style={{
        backgroundImage: `url(${dark ? patternDark : patternLight})`,
      }}
    >
      <div className="container">
        <div className="item" style={backGroundShape}>
          {dark ? <EpisodesIcon /> : <EpisodesIconLight />}
          <div>
            <h1> {episodes.length}+ </h1>
            <p>Episodes</p>
          </div>
        </div>
        <div className="item" style={backGroundShape}>
          {dark ? <MinutesIcon /> : <MinutesIconLight />}
          <div>
            <h1>{episodes.length * 93}+ </h1>
            <p>Minutes of Blabla</p>
          </div>
        </div>
        <div className="item" style={backGroundShape}>
          {dark ? <GuestIcon /> : <GuestIconLight />}
          <div>
            <h1> {parseInt(episodes.length * 1.5)}+ </h1>
            <p>Guests</p>
          </div>
        </div>
      </div>
    </div>
  )
}
