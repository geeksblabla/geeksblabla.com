import React from "react"
import { Link } from "gatsby"
import MobileNav from "./MobileNav"
import Links from "./Links"
import Logo from "assets/logo.svg"
import "./index.scss"

import Search from "../Search"
const searchIndices = [{ name: `Blablas`, title: `Blablas` }]
//const logo = require("../../images/logo.png")

//const GeeksBlablaLogo = () => <Image />

const Header = () => (
  <header className="container header">
    <div className="header-container">
      <Link to="/">
        <Logo className="logo" alt="Logo" />
      </Link>
      <Search indices={searchIndices} />
      <div className="menu">
        <Links />
      </div>
      <MobileNav />
    </div>
  </header>
)

export default Header
