import React from "react"
import { Link } from "gatsby"

import "./index.scss"

const logo = require("../../images/logo.png")

//const GeeksBlablaLogo = () => <Image />

const Header = () => (
  <header className="header">
    <div className="header-container">
      <img src={logo} className="logo" />
      <div className="menu">
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
          to="/suggest"
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
      </div>
    </div>
  </header>
)

export default Header
