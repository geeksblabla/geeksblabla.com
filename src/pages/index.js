import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import {
  Hero,
  Statistics,
  EpisodesTypes,
  TopEpisodes,
  Reviews,
  Notification,
} from "components/Home"
import SEO from "components/SEO"

const IndexPage = ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node

  return (
    <Layout>
      <SEO />
      <Hero />
      <Statistics />
      <EpisodesTypes />
      <TopEpisodes />
      <Reviews />
      <Notification />
    </Layout>
  )
}

export default IndexPage

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
          excerpt(pruneLength: 100)
          id
          fields {
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
