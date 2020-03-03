import React from "react"
import PlayIcon from "assets/play-icon.svg"

export default function Play(props) {
  const { handleClick } = props

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PlayIcon height="40px" width="40px" />
    </button>
  )
}
