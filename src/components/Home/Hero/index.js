import React from "react"
import { useTheme } from "../../Theme/ThemeContext"
import { Link } from "gatsby"
import PlayIcon from "assets/play.svg"
import HeroImageLight from "assets/hero_light.svg"
import HeroImage from "assets/hero.svg"
import HeroImageMobile from "assets/hero_mobile.svg"
import HeroImageMobileLight from "assets/hero_mobile_light.svg"
import "./index.scss"
import { useTranslation } from "react-i18next"
export default () => {
  const { dark } = useTheme()
  const { t } = useTranslation()

  return (
    <div className="container hero">
      <div className="description">
        <h1>{t("Hottest technology")}</h1>
        <p>{t("intro")}</p>
        <div className="actions">
          <Link to="/blablas" className="button left">
            <PlayIcon /> {t("Start Watching")}
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
