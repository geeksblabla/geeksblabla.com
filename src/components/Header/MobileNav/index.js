import React, { useState } from "react"
import Links from "../Links"

import "./index.scss"

export default ({ color = "white" }) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)
  return (
    <div className="mobile-menu">
      <button
        onClick={toggle}
        aria-label={`${isToggledOn ? "close menu" : "open menu"}`}
      >
        <div className={`${isToggledOn ? "menu-icon open" : "menu-icon"}`} />
      </button>
      {isToggledOn && (
        <div className="mobile-nav-container">
          <div className="mobile-nav">
            <Links id="mobile" />
          </div>
        </div>
      )}
    </div>
  )
}
