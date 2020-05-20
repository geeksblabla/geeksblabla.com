import React from "react"
import "./index.scss"
import { useTheme } from "../ThemeContext"
import Sun from "../../../assets/sun.svg"
import Moon from "../../../assets/moon.svg"

const ThemeToggle = () => {
  const { dark, toggleTheme } = useTheme()

  return (
    <div className="theme-toggle">
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {dark ? (
          <Sun className="theme-toggle-icon" />
        ) : (
          <Moon className="theme-toggle-icon" />
        )}
      </button>
    </div>
  )
}

export default ThemeToggle
