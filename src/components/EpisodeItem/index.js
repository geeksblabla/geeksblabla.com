import React from "react"
import { Link } from "gatsby"

import "./index.scss"

export default ({ title, date, slug, duration, active }) => (
  <Link
    to={slug}
    activeClassName="episode-item active"
    className={active ? "episode-item active" : "episode-item"}
    aria-label="View blog page"
  >
    <div className="placeholder" />
    <div>
      <h2> {title}</h2>
      <p>
        {duration} | {date}
      </p>
    </div>
  </Link>
)
