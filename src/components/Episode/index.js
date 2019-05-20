import React from "react"
import { Link } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "./Loader"

import "./index.scss"
import VideoPlaceHolder from "../Images/VideoPlaceHolder"

const image = require("../../images/video_placeholder.png")

export default class Episode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: !!props.placeholder,
    }
  }

  onReady = () => {
    this.setState({ ready: true })
  }

  render() {
    const {
      title,
      slug,
      date,
      duration,
      placeholder,
      label,
      video,
      description,
      ...props
    } = this.props
    const { ready } = this.state

    return (
      <div className="episode" {...props}>
        {label && <span className="label"> last Episode </span>}
        {!ready && <Loader />}
        {placeholder ? (
          <Link to={slug}>
            <VideoPlaceHolder />
          </Link>
        ) : (
          <FacebookPlayer
            videoId={video}
            onReady={this.onReady}
            onError={() => console.log("facebook video player error ")}
          />
        )}

        <div
          className={!placeholder ? "info placeholder" : "info"}
          style={{
            visibility: `${ready ? "visible" : "hidden"}`,
          }}
        >
          <div className="title">
            <h2> {title} </h2>
            <h5> {duration} </h5>
          </div>
          <div className="description">
            {placeholder ? (
              <p> {description}</p>
            ) : (
              <MDXRenderer>{description}</MDXRenderer>
            )}
          </div>
        </div>
      </div>
    )
  }
}
