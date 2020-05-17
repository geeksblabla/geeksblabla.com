import React, { useState, useEffect, createContext } from "react"

export const ThemeContext = createContext()

const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const existingTheme = localStorage.getItem("theme")

    if (existingTheme) {
      setTheme(existingTheme)
    } else if (supportsDarkMode()) {
      setTheme("dark")
    }

    document.body.className = theme
  }, [theme])

  const toggleDark = () => {
    if (theme === "dark") {
      localStorage.setItem("theme", "light")
      setTheme("light")
      return
    }

    localStorage.setItem("theme", "dark")
    setTheme("dark")
  }

  const state = [theme, toggleDark]

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
}
