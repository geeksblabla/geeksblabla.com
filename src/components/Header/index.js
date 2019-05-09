import React from "react"
import { Link } from "gatsby"
import MobileNav from "./MobileNav"
import Links from "./Links"

import "./index.scss"

const logo = require("../../images/logo.png")

//const GeeksBlablaLogo = () => <Image />

const Header = () => (
  <header className="header">
    <div className="header-container">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <div className="menu">
        <Links />
      </div>
      <MobileNav />
    </div>
  </header>
)

export default Header
