import React from "react"
import VideoPlayer from "../VideoPlayer"
import { AudioPlayer } from "../AudioPlayer"
import "./index.scss"
import Notes from "../Notes"
import Actions from "../Actions"
import { ModeContext } from "components/Mode/ModeContext"

const Episode = ({
  title,
  slug,
  date,
  video,
  audio,
  description,
  repoLink,
}) => (
  <div className="episode">
    <Player video={video} audio={audio} />
    <div className="info">
      <div className="title">
        <p>{date}</p>
        <h1> {title} </h1>
        <Actions title={title} shareUrl={`https://geeksblabla.com/${slug}`} />
      </div>
      <Notes content={description} repoLink={repoLink} />
    </div>
  </div>
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
