import React, { useState, useEffect, createContext } from "react"

export const ThemeContext = createContext("light")
const isBrowser = typeof window !== "undefined"

const supportsDarkMode = () =>
  isBrowser &&
  window.matchMedia("(prefers-color-scheme: dark)").matches === true

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const existingTheme = isBrowser && localStorage.getItem("theme")

    if (existingTheme) {
      setTheme(existingTheme)
    } else if (supportsDarkMode()) {
      setTheme("dark")
    }

    if (isBrowser) {
      document.body.className = theme
    }
  }, [theme])

  const toggleDark = () => {
    if (theme === "dark") {
      isBrowser && localStorage.setItem("theme", "light")
      setTheme("light")
      return
    }

    isBrowser && localStorage.setItem("theme", "dark")
    setTheme("dark")
  }

  const state = [theme, toggleDark]

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
}
