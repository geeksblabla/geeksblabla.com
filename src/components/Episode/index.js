import React from "react"
import { Link } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import "./index.scss"

const image = require("../../images/video_placeholder.png")

export default ({
  title,
  slug,
  date,
  duration,
  placholder,
  label,
  video,
  description,
  ...props
}) => (
  <div className="episode" {...props}>
    {label && <span className="label"> last Episode </span>}

    {placholder ? (
      <Link to={slug}>
        <img src={image} />
      </Link>
    ) : (
      <div className="video">
        <div className="placeholder" />
        <div className="fb-video" data-href={video} data-show-text="false" />
      </div>
    )}

    <div className="info">
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
