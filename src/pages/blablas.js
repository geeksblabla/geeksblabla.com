import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/SEO"

import Layout from "../components/Layout"
import Episode from "../components/Episode"

export default ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout withNextEpisode>
      <div className="blablas">
        <SEO />
        <Episode
          {...lastEpisode.fields}
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
            guests {
              link
              name
            }
            description
            prepared {
              link
              name
            }
            links { 
              title
              url
            }
            notes
          }
        }
      }
    }
  }
`
