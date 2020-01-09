import React from "react"
import "./index.scss"

import Auth0 from "assets/auth0.svg"
import GatsbyJs from "assets/gatsby.svg"
import ReactIcon from "assets/react-icon.svg"
import Figma from "assets/figma.svg"
import Netlify from "assets/netlify.svg"
import Github from "assets/github.svg"
import FunaDB from "assets/funadb.svg"

export default ({}) => (
  <div className="footer">
    <div className="container">
      <p>
        <a href="https://github.com/DevC-Casa/geeksblabla.com">
          Want to Contribute?
        </a>
      </p>
      <p>© DevC Casablanca 2019 </p>
      <p>
        This Website Made with ❤️ By <a> DevC Team </a>
      </p>
      <p>
        <ReactIcon alt="react" /> <GatsbyJs /> <FunaDB /> <Auth0 />
        <Figma /> <Netlify /> <Github />
      </p>
    </div>
  </div>
)
