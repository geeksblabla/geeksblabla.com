import React, { useContext } from "react"
import "./index.scss"
import { ThemeContext } from "../ThemeContext"
import Sun from "../../../assets/sun.svg"
import Moon from "../../../assets/moon.svg"

const ThemeToggle = () => {
  const [theme, toggleTheme] = useContext(ThemeContext)

  return (
    <div className="theme-toggle">
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {theme === "dark" ? (
          <Sun className="theme-toggle-icon" />
        ) : (
          <Moon className="theme-toggle-icon" />
        )}
      </button>
    </div>
  )
}

export default ThemeToggle
