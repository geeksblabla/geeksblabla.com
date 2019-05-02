import React from "react"
import { Link } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "./Loader"

import "./index.scss"

const image = require("../../images/video_placeholder.png")

export default class Episode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: !!props.placholder,
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
      placholder,
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
        {placholder ? (
          <Link to={slug}>
            <img src={image} />
          </Link>
        ) : (
          <FacebookPlayer videoId={video} onReady={this.onReady} />
        )}

        <div
          className="info"
          style={{
            visibility: `${ready ? "visible" : "hidden"}`,
          }}
        >
          <div>
            <h2> {title} </h2>
            <h5> {duration} </h5>
          </div>
          <div className="description">
            <MDXRenderer>{description}</MDXRenderer>
          </div>
        </div>
      </div>
    )
  }
}
