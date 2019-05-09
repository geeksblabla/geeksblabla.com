import React from "react"
import { Link } from "gatsby"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "./Loader"

import "./index.scss"
import VideoPlaceHolder from "../Images/VideoPlaceHolder"

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
      fields: { slug },
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
          className="info"
          style={{
            visibility: `${ready ? "visible" : "hidden"}`,
          }}
        >
          <div>
            <h2>{title}</h2>
            <h5>{duration}</h5>
          </div>
        </div>
      </div>
    )
  }
}
