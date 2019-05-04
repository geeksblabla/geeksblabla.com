import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/SEO"
import AboutImage from "../components/Images/AboutImage"

const image = require("../images/about.png")

export default () => (
  <Layout withNextEpisode>
    <SEO />
    <div className="about">
      <AboutImage />
      <div className="description">
        <h1> We Believe Community Matters </h1>
        <p>
          Geeksblabla is a webinar where we meet to share and learn about
          awesome topics from the best.
        </p>
        <p>
          We Invite knowledgable and interesting people who are not always known
          to the public so that they share with us their experience.
        </p>
        <p>
          We talk about the hottest new topics and explain it to the community
          in a way that is simple and approachable.
        </p>
        <br />
        <br />
        <Link to="blablas" className="button">
          See All Blablas
        </Link>
      </div>
    </div>
  </Layout>
)
