import React from "react"
import { Link } from "gatsby"

import "./index.scss"

export default ({ active }) => (
  <li className={active ? "episode-item active" : "episode-item"}>
    <div className="placeholder" />
    <div>
      <h2> Episode Title With Ahmed Ali </h2>
      <p> 01:30:00 | 30th April </p>
    </div>
  </li>
)
