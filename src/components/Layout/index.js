import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "../Header"
import NextEp from "../NextEp"
import "./layout.scss"

export default ({ children, withNextEpisode, backImage, mainStyle }) => (
  <div className={backImage ? "container image-back" : "container"}>
    <Header />
    <main style={mainStyle}>{children}</main>
    {withNextEpisode ? <NextEp /> : <div />}
  </div>
)
