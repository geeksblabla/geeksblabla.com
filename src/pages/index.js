import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/seo"
import "./reset.css"
import "./index.scss"

const IndexPage = () => (
  <Layout withNextEpisode backImage>
    <div className="intro">
      <h1>
        Enjoy Top Tech <br /> Topics In Darija <br /> With GeekBlablas
      </h1>
      <button className="button"> See All Blablas</button>
    </div>
    <Episode label="last episode" />
  </Layout>
)

export default IndexPage
