// import Github from "assets/github.svg"
import React from "react"
import "./index.scss"
import Auth0 from "assets/auth0.svg"
import GatsbyJs from "assets/gatsby.svg"
import ReactIcon from "assets/react-icon.svg"
import Figma from "assets/figma.svg"
import Netlify from "assets/netlify.svg"
import FunaDB from "assets/funadb.svg"

export default ({ style }) => (
  <div className="footer" style={style}>
    <div className="container">
      <p>
        <a href="https://github.com/DevC-Casa/geeksblabla.com" rel="noopener">
          Want to Contribute?
        </a>
      </p>

      <p>
        This Website is made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
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
        <Figma /> <ReactIcon alt="react" /> <GatsbyJs /> <FunaDB /> <Auth0 />
        <Netlify />
      </p>
      <p>
        Sourced on{" "}
        <a href="https://github.com/DevC-Casa/geeksblabla.com" rel="noopener">
          GitHub
        </a>
      </p>
      <p>© DevC Casablanca 2018 - {new Date().getFullYear()}</p>
    </div>
  </div>
)
