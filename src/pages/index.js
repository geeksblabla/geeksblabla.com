import React from "react"
import { Link } from "gatsby"

import Header from "../components/Header"
import NextEp from "../components/NextEp"
import Image from "../components/image"
import SEO from "../components/seo"
import "./reset.css"
import "./index.scss"

const image = require("../images/video_placeholder.png")

const IndexPage = () => (
  <div className="home">
    <Header />
    <div className="main">
      <div className="intro">
        <h1>
          Enjoy Top Tech <br /> Topics In Darija <br /> With GeekBlablas
        </h1>
        <button> See All Blablas</button>
      </div>
      <div className="current-episode">
        <img src={image} />
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
    </div>
    <NextEp />
  </div>
)

export default IndexPage
