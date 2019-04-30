import React from "react"
import { Link } from "gatsby"

import "./index.scss"

const image = require("../../images/video_placeholder.png")

export default ({ showSource, label, ...props }) => (
  <div className="episode" {...props}>
    {label && <span className="label"> last Episode </span>}

    {!showSource ? (
      <img src={image} />
    ) : (
      <div
        class="fb-video"
        data-href="https://www.facebook.com/sfoukahi/videos/2254365704624093/"
        data-show-text="false"
      />
    )}
    <div className="info">
      <div>
        <h2> Episode Title Episode Title </h2>
        <h5> 01:30:00 </h5>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere ex
        voluptas libero veritatis dicta optio molestias animi ratione, vel
        blanditiis ea eum laboriosam aspernatur adipisci dignissimos autem
        inventore repudiandae deleniti!
      </p>
    </div>
  </div>
)
