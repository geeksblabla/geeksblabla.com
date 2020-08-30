import React from "react"
import { StaticQuery, graphql } from "gatsby"
import EpisodeItem from "../EpisodeItem"

/**
 * This component behaves the same as the old EpisodesMenu
 * Check the EpisodesMenu.js file for an explanation why this component exists.
 */

export default ({ selectedEpisode }) => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          filter: {
            frontmatter: { published: { eq: true }, isNext: { eq: false } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              id
              fields {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                duration
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) =>
      allMdx.edges.map(({ node }) => (
        <EpisodeItem
          {...node.fields}
          key={node.id}
          active={selectedEpisode === node.id}
        />
      ))
    }
  />
)
