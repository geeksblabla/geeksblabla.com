import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { blabla } }) => (
  <Layout withNextEpisode>
    <div className="blablas">
      <SEO fields={blabla} isEpisode postUrl={blabla.fields.slug} />
      <EpisodesMenu selectedEpisode={blabla.id} />
      <Episode
        style={{
          alignSelf: "flex-start",
          width: "100%",
        }}
        {...blabla}
      />
    </div>
  </Layout>
)

export const pageQuery = graphql`
  query($id: String!) {
    blabla: blablasYaml(id: { eq: $id }) {
      ...blablaContent
    }
  }
`
