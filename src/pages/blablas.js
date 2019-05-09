import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { blabla } }) => {
  const lastEpisode = blabla.edges[blabla.edges.length - 1].node
  return (
    <Layout withNextEpisode>
      <div className="blablas">
        <SEO />
        <EpisodesMenu selectedEpisode={lastEpisode.id} />
        <Episode
          style={{
            alignSelf: "flex-start",
            width: "100%",
          }}
          {...lastEpisode}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
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
`
