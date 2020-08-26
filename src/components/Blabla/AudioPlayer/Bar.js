/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react"
// import moment from "moment"
// import momentDurationFormatSetup from "moment-duration-format"

export default function Bar(props) {
  const { duration, curTime, onTimeUpdate } = props

  const curPercentage = (curTime / duration) * 100

  //   function formatDuration(duration) {
  //     return moment.duration(duration, "seconds").format("mm:ss", { trim: false })
  //   }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX
    const bar = document.querySelector(".bar__progress")
    const barStart = bar.getBoundingClientRect().left + window.scrollX
    const barWidth = bar.offsetWidth
    const clickPositionInBar = clickPositionInPage - barStart
    const timePerPixel = duration / barWidth
    return timePerPixel * clickPositionInBar
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e))

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove))
    }

    document.addEventListener("mousemove", updateTimeOnMove)

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove)
    })
  }

  return (
    <div className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div
        role="timer"
        className="bar__progress"
        style={{
          background:
            duration === 0
              ? "#FFF"
              : `linear-gradient(to right, #a109d5 ${curPercentage}%, white 0)`,
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar__time">
        {duration === 0 ? "Loading ..." : formatDuration(duration)}
      </span>
    </div>
  )
}

const formatDuration = secondsCount => {
  let hours = Math.floor(secondsCount / 3600)
  let minutes = Math.floor((secondsCount - hours * 3600) / 60)
  let seconds = parseInt(secondsCount - hours * 3600 - minutes * 60)
  let time = ""

  if (hours !== 0) {
    time = hours + ":"
  }
  if (minutes !== 0 || time !== "") {
    minutes = minutes < 10 && time !== "" ? "0" + minutes : String(minutes)
    time += minutes + ":"
  }
  if (time === "") {
    time = secondsCount + "s"
  } else {
    time += seconds < 10 ? "0" + seconds : String(seconds)
  }
  return time
}
