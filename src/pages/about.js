import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/seo"

const image = require("../images/about.png")

export default () => (
  <Layout withNextEpisode backImage>
    <div className="about">
      <img src={image} />
      <div>
        <h1> We Believe Community Matters </h1>
        <p>
          Le Lorem Ipsum est simplement du faux texte employé dans la
          composition et la mise en page avant impression. Le Lorem Ipsum est le
          faux texte standard de l'imprimerie depuis les années 1500, quand un
          imprimeur anonyme assembla ensemble des morceaux de texte pour
          réaliser un livre spécimen de polices de texte. Il n'a pas fait que
          survivre cinq siècles, mais s'est aussi adapté à la bureautique
          informatique.
        </p>
        <button className="button"> See All Blablas</button>
      </div>
    </div>
  </Layout>
)
