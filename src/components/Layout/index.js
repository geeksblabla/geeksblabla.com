import React from "react"
import ErrorBoundary from "../ErrorBoundary"

import Header from "../Header"
import NextEp from "../NextEp"
import "./reset.css"
import "./layout.scss"
require("typeface-open-sans")

export default ({ children, withNextEpisode, backImage, mainStyle }) => (
  <ErrorBoundary>
    <div className={backImage ? "container image-back" : "container"}>
      <Header />
      <main style={mainStyle}>{children}</main>
      {withNextEpisode ? <NextEp /> : <div />}
    </div>
  </ErrorBoundary>
)
