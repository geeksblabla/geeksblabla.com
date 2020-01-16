import React, { useContext } from "react"
import "./index.scss"
import { ModeContext } from "../ModeContext"

export default ({ id = "cb3" }) => {
  const { isVideo, setIsVideo } = React.useContext(ModeContext)

  const handleInputChange = event => {
    setIsVideo(event.target.checked)
  }

  return (
    <div className="toggle">
      <input
        className="tgl tgl-flip"
        id={id}
        type="checkbox"
        checked={isVideo}
        onChange={handleInputChange}
      />
      <label
        className="tgl-btn"
        data-tg-off="Audio"
        data-tg-on="Video"
        htmlFor={id}
      ></label>
    </div>
  )
}
