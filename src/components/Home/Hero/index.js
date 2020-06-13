import React from "react"
import { useTheme } from "../../Theme/ThemeContext"
import { Link } from "gatsby"
import PlayIcon from "assets/play.svg"
import HeroImageLight from "assets/hero_light.svg"
import HeroImage from "assets/hero.svg"
import HeroImageMobile from "assets/hero_mobile.svg"
import HeroImageMobileLight from "assets/hero_mobile_light.svg"
import "./index.scss"

export default () => {
  const { dark } = useTheme()

  return (
    <div className="container hero">
      <div className="description">
        <h1>Hottest technology trends, In Darija!</h1>
        <p>
          GeeksBlaBla is a community initiative, to discuss, highlight and share
          the latest IT topics in Moroccan Darija.
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
      {dark ? (
        <>
          <HeroImage className="crea desktop-only" />
          <HeroImageMobile className="crea mobile-only" />
        </>
      ) : (
        <>
          <HeroImageLight className="crea desktop-only" />
          <HeroImageMobileLight className="crea mobile-only" />
        </>
      )}
    </div>
  )
}
