import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"

import Layout from "components/Layout"
import { Episode, EpisodesMenu } from "components/Blabla"

export default ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout>
      <SEO />
      <div className="container blablas">
        <EpisodesMenu selectedEpisode={lastEpisode.id} />
        <Episode
          style={{
            alignSelf: "flex-start",
            width: "100%",
          }}
          {...lastEpisode.fields}
          description={lastEpisode.body}
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
          body
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
