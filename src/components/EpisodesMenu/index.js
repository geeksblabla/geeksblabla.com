import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import EpisodeItem from "../EpisodeItem"
import "./index.scss"

export const blablaFragment = graphql`
  fragment blablaContent on BlablasYaml {
    id
    title
    date(formatString: "MMMM DD, YYYY")
    duration
    video
    fields {
      slug
    }
  }
`

export default ({ selectedEpisode }) => {
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

  useEffect(() => {
    const list = document.getElementById("episodes")
    const targetLi = document.getElementById(selectedEpisode)

    list.scrollTop = targetLi.offsetTop - 400
  }, [])

  return (
    <ul className="episodes-list" id="episodes">
      {blabla.edges.map(({ node }) => (
        <EpisodeItem
          {...node}
          key={node.id}
          active={selectedEpisode === node.id}
        />
      ))}
    </ul>
  )
}
