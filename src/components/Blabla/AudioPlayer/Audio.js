import React from "react"

import Title from "./Song"
import Play from "./Play"
import Pause from "./Pause"
import Bar from "./Bar"

import useAudioPlayer from "./useAudioPlayer"

export default ({
  audio = "https://anchor.fm/s/88e3048/podcast/play/8871925/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2019-11-8%2F37064067-48000-2-7061c427555f3.m4a",
  title = "Episode Title ",
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
