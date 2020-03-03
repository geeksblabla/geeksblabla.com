import React from "react"
import { Link } from "gatsby"
import MobileNav from "./MobileNav"
import Links from "./Links"
import Logo from "assets/logo.svg"
import "./index.scss"

//const logo = require("../../images/logo.png")

//const GeeksBlablaLogo = () => <Image />

const Header = () => (
  <header className="container header">
    <div className="header-container">
      <Link to="/">
        <Logo className="logo" alt="Logo" />
      </Link>
      <div className="menu">
        <Links />
      </div>
      <MobileNav />
    </div>
  </header>
)

export default Header
