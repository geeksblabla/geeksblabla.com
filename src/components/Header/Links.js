import React from "react"
import { Link } from "gatsby"

export default () => (
  <>
    <Link
      to="/"
      activeClassName="active"
      aria-label="View blog page"
      className="item"
    >
      Home
    </Link>
    <Link
      to="/blablas"
      activeClassName="active"
      className="item"
      aria-label="View blog page"
    >
      Blablas
    </Link>
    <Link
      to="/suggest-new-episode"
      activeClassName="active"
      className="item"
      aria-label="View blog page"
    >
      suggest
    </Link>
    <Link
      to="/about"
      activeClassName="active"
      className="item"
      aria-label="View blog page"
    >
      About
    </Link>
  </>
)
