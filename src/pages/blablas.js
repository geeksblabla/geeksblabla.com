import React from "react"
import SEO from "../components/SEO"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout
      withNextEpisode
      mainStyle={{
        marginTop: "50px",
        alignItems: "flex-start",
      }}
    >
      <div className="blablas">
        <SEO />
        <EpisodesMenu selectedEpisode={lastEpisode.id} />
        <Episode
          style={{
            alignSelf: "flex-start",
            width: "100%",
          }}
          {...lastEpisode.fields}
          description={lastEpisode.code.body}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: { published: { eq: true }, isNext: { eq: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          code {
            body
          }
          fields {
            id
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            duration
            url
            video
          }
        }
      }
    }
  }
`
