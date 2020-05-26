import React, { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import Loader from "components/Loader"
import "./index.scss"

const VideoPlayer = ({ video }) => {
  const [ready, setReady] = useState(false)
  const player = useRef(null)

  const seekToHash = () => {
    const hash = window.location.hash.substring(1) //Puts hash in variable, and removes the # character
    console.log(player)
    player.current.seekTo(parseInt(hash, 10), "seconds")
  }
  useEffect(() => {
    window.addEventListener("hashchange", seekToHash, false)
    return () => {
      window.removeEventListener("hashchange", seekToHash, false)
    }
  }, [])

  const onReady = () => {
    setReady(true)
  }
  const onError = () => {
    console.log("facebook video player error ")
    setReady(true)
  }

  return (
    <div className="video-player">
      {!ready && <Loader />}
      <ReactPlayer
        playing
        width="100%"
        height="auto"
        ref={player}
        controls
        url={`https://www.facebook.com/facebook/videos/${video}`}
        onBufferEnd={onReady}
        onError={onError}
      />
    </div>
  )
}

export default VideoPlayer
