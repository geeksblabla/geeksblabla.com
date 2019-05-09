import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/SEO"

import "./reset.css"
import "./index.scss"

require("typeface-open-sans")

export default () => {
  const { blabla } = useStaticQuery(graphql`
    query {
      blabla: allBlablasYaml(
        filter: { published: { eq: true }, isNext: { eq: false } }
        sort: { fields: [date], order: DESC }
      ) {
        edges {
          node {
            ...blablaContent
          }
        }
      }
    }
  `)

  const lastEpisode = blabla.edges[blabla.edges.length - 1].node

  return (
    <Layout withNextEpisode backImage>
      <SEO />
      <div className="intro">
        <h1>
          Enjoy Top Tech <br /> Topics In Darija <br /> With GeeksBlabla
        </h1>
        <Link to="blablas" className="button">
          See All Blablas
        </Link>
      </div>
      <Episode label="last episode" {...lastEpisode} placeholder />
    </Layout>
  )
}
