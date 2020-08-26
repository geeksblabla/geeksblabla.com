import React, { useState, useEffect, createContext } from "react"

const isBrowser = typeof window !== "undefined"
export const ThemeContext = createContext({ dark: true, toggleTheme: () => {} })

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(
    !((isBrowser && window.localStorage.getItem("dark") === "false" ) || false)
  )

  useEffect(() => {
    if (isBrowser) {
      window.localStorage.setItem("dark", dark)
      document.body.className = dark ? "" : "light"
    }
  }, [dark])

  const toggleTheme = React.useCallback(() => setDark((dark) => !dark), [])

  const Theme = React.useMemo(
    () => ({
      toggleTheme,
      dark,
    }),
    [dark, toggleTheme]
  )
  return <ThemeContext.Provider value={Theme}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be inside a Provider with a value")
  }
  return context // { dark: boolean, toggleTheme: () => {} }
}
