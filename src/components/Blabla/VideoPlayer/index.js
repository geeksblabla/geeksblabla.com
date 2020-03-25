import React, { useState } from "react"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "components/Loader"
import "./index.scss"
import { TimeContext } from "components/Time/TimeContext"

const VideoPlayer = ({ video }) => {
  const [ready, setReady] = useState(false)
  const { time } = React.useContext(TimeContext)

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
      <FacebookPlayer
        autoplay
        allowfullscreen={true}
        videoId={video}
        onFinishedBuffering={onReady}
        onError={onError}
        time={time}
      />
    </div>
  )
}

export default VideoPlayer
