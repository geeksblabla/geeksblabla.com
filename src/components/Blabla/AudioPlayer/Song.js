import React from "react"

export default ({ children }) => {
  return (
    <div className="song">
      <h1 className="song__title">{children}</h1>
    </div>
  )
}
