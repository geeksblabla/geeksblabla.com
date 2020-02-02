import React, { useState, useEffect } from "react"
const isBrowser = typeof window !== "undefined"

export const ModeContext = React.createContext({ isVideo: true })

export const ModeProvider = ({ children }) => {
  const [isVideo, setIsVideo] = useState(
    (isBrowser && parseInt(localStorage.getItem("isVideo"))) || true
  )

  useEffect(
    () => isBrowser && window.localStorage.setItem("isVideo", isVideo),
    [isVideo]
  )

  return (
    <ModeContext.Provider value={{ isVideo, setIsVideo }}>
      {children}
    </ModeContext.Provider>
  )
}
