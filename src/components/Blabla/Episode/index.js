import React from "react"
import VideoPlayer from "../VideoPlayer"
import { AudioPlayer } from "../AudioPlayer"
import "./index.scss"
import Notes from "../Notes"
import Actions from "../Actions"
import { ModeContext } from "components/Mode/ModeContext"
import { TimeProvider } from "components/Time/TimeContext"

const Episode = ({
  title,
  slug,
  date,
  video,
  audio,
  description,
  repoLink,
}) => (
  <TimeProvider>
    <div className="episode">
      <Player video={video} audio={audio} />
      <div className="info">
        <div className="title">
          <p>{date}</p>
          <h1> {title} </h1>
          <Actions
            repoLink={repoLink}
            title={title}
            shareUrl={`https://geeksblabla.com/${slug}`}
          />
        </div>
        <Notes content={description} />
      </div>
    </div>
  </TimeProvider>
)

export default Episode

const Player = ({ audio, video }) => {
  const { isVideo } = React.useContext(ModeContext)
  return (
    <>
      {isVideo ? <VideoPlayer video={video} /> : <AudioPlayer audio={audio} />}
    </>
  )
}
