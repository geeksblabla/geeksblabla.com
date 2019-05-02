import React from "react"
import "./index.scss"
export default props => {
  return (
    <div className="loader">
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
