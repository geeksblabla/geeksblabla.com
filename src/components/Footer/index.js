// import Github from "assets/github.svg"
import React from "react"
import "./index.scss"
import Auth0 from "assets/auth0.svg"
import GatsbyJs from "assets/gatsby.svg"
import ReactIcon from "assets/react-icon.svg"
import Figma from "assets/figma.svg"
import Netlify from "assets/netlify.svg"
import FunaDB from "assets/funadb.svg"
import { Link } from "gatsby"
import Logo from "../../assets/logo.svg"

export default ({ style }) => (
  <div className="Footer" style={style}>
    <div className="Footer-container">
      <div className={"Footer-main"}>
        <div className={"Footer-main-logo"}>
          <Link to="/">
            <Logo alt="Logo" />
          </Link>
        </div>

        <div className={"Footer-main-links"}>
          <div className={"Footer-main-follow"}>
            <p>Follow</p>
            <ul>
              <li>
                <a
                  target={"_blank"}
                  href={"https://www.youtube.com/c/GeeksBlaBla01"}
                >
                  Youtube
                </a>
              </li>
              <li>
                <a target={"_blank"} href={"https://twitter.com/geeksblabla"}>
                  Twitter
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href={"https://www.linkedin.com/company/69317726/"}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href={"https://www.facebook.com/geeksblabla/"}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href={"https://www.instagram.com/geeksblabla/?hl=fr"}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className={"Footer-main-community"}>
            <p>More</p>
            <ul>
              <li>
                <a target={"_blank"} href="https://www.stateofdev.ma">
                  StateOfDev.ma
                </a>
              </li>
              <li>
                <a target={"_blank"} href="https://www.blablaconf.com">
                  BlablaConf.com
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="https://github.com/DevC-Casa/awesome-morocco"
                >
                  awesome-morocco
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={"Footer-main-contribution"}>
          <p>
            <Link
              to="https://github.com/DevC-Casa/geeksblabla.com"
              rel="noopener"
            >
              Want to Contribute?
            </Link>
          </p>

          <p>
            This Website is made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
          </p>
          <p>
            By{" "}
            <a
              href="https://www.facebook.com/groups/DevC.Casablanca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              DevC Casa Team{" "}
            </a>{" "}
            using
          </p>
          <p>
            <Figma /> <ReactIcon alt="react" /> <GatsbyJs /> <FunaDB />{" "}
            <Auth0 />
            <Netlify />
          </p>
          <p>
            Sourced on{" "}
            <Link
              to="https://github.com/DevC-Casa/geeksblabla.com"
              rel="noopener"
            >
              GitHub
            </Link>
          </p>
        </div>
      </div>

      <div className={"Footer-copyright"}>
        <p>© Geeksblabla 2018 - {new Date().getFullYear()}</p>
      </div>
    </div>
  </div>
)
