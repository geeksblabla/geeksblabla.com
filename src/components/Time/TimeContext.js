import React, { useState } from "react"

export const TimeContext = React.createContext({ time: 0 })

export const TimeProvider = ({ children }) => {
  const [time, setTime] = useState(0)

  const jumpTo = seconds => {
    setTime(seconds)
  }

  return (
    <TimeContext.Provider value={{ time, jumpTo }}>
      {children}
    </TimeContext.Provider>
  )
}
