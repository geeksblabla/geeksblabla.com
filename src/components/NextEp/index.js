import React from "react"
import { Link } from "gatsby"

import "./index.scss"

export default () => (
  <div className="next-ep">
    <div className="item">
      <h4 className="next"> next episode </h4>
      <h1 className="title"> Design System in Figma With Ahmed Ali </h1>
    </div>
    <div className="item">
      <h2 className="time"> 30th April, 20h </h2>
      <p className="place">
        The streaming will be on DevC Casablanca Facebook Group
      </p>
    </div>
    <div className="item">
      <button className="button outline"> Add to Calendar </button>
    </div>
  </div>
)
