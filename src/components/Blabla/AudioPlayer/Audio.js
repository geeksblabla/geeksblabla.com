/* eslint-disable jsx-a11y/media-has-caption */
// import Title from "./Song"
import React from "react"
import Play from "./Play"
import Pause from "./Pause"
import Bar from "./Bar"

import useAudioPlayer from "./useAudioPlayer"

export default ({
  audio = "https://d3ctxlq1ktw2nl.cloudfront.net/production/2019-11-8/37064067-48000-2-7061c427555f3.m4a",
  // title = "Episode Title ",
}) => {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  } = useAudioPlayer()

  return (
    <div className="player">
      <audio id="audio">
        <source src={audio} type="audio/mp4" preload="auto" />
        Your browser does not support the <code>audio</code> element.
      </audio>
      {/* <Title> {title}</Title> */}
      <div className="controls">
        {playing ? (
          <Pause handleClick={() => setPlaying(false)} />
        ) : (
          <Play handleClick={() => setPlaying(true)} />
        )}
        <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={time => setClickedTime(time)}
        />
      </div>
    </div>
  )
}
