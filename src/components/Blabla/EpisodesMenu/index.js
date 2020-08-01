import React from "react"
import { StaticQuery, graphql } from "gatsby"

import EpisodeItem from "../EpisodeItem"
import "./index.scss"

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
                views
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => (
      <ul className="episodes-list">
        {allMdx.edges.map(({ node }) => (
          <EpisodeItem
            {...node.fields}
            key={node.id}
            active={selectedEpisode === node.id}
          />
        ))}
      </ul>
    )}
  />
)
