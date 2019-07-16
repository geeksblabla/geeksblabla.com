import React from "react"
import "./index.scss"
export default props => {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
