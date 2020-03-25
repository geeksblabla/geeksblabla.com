import React from "react"
import { TimeContext } from "components/Time/TimeContext"

const TimeStamp = ({ time }) => {
  const { jumpTo } = React.useContext(TimeContext)

  const timeArray = time.split(":")

  const seconds = parseInt(timeArray[0]) * 3600 + parseInt(timeArray[1]) * 60

  return (
    <a role="button" onClick={() => jumpTo(seconds)}>
      {time}
    </a>
  )
}

export default TimeStamp
