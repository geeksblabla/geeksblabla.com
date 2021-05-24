import React, { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player/youtube"
import "./index.scss"

const VideoPlayer = ({ url }) => {
  const player = useRef(null)

  const seekToHash = () => {
    const hash = window.location.hash.substring(1) //Puts hash in variable, and removes the # character
    player.current.seekTo(parseFloat(hash), "seconds")
  }
  useEffect(() => {
    window.addEventListener("hashchange", seekToHash, false)
    return () => {
      window.removeEventListener("hashchange", seekToHash, false)
    }
  }, [])

  const onError = (e) => {
    console.log("facebook video player error ", e)
  }
  return (
    <div className="video-player">
      <ReactPlayer
        className="react-player"
        playing
        width="100%"
        height="100%"
        ref={player}
        controls
        url={url}
        onError={onError}
      />
    </div>
  )
}

export default VideoPlayer
