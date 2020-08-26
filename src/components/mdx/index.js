/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react"

export default {
  a: props => <a {...props} target="_blank" />,
  h1: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  h2: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  h3: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  p: ({ children, ...props }) => {
    const regex = /[0-9]{1,2}:[0-9]{1,2}/

    let time, seconds, text

    if (typeof children === "string") {
      time = children.match(regex)

      if (time) {
        let timeArray = time[0].split(":")
        seconds =
          parseInt(timeArray[0], 10) * 3600 + parseInt(timeArray[1], 10) * 60
        text = children.slice(time[0].length, children.length)
      }
    }

    return (
      <p {...props}>
        {time && <a href={`#${seconds}`}>{time}</a>}
        {text ? text : children}
      </p>
    )
  },
}
