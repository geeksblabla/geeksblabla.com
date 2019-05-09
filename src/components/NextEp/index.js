import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./index.scss"

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

  const { title, date, url } = blabla.edges[0].node

  return (
    <div className="next-ep">
      <div className="item">
        <h4 className="next"> Next episode </h4>
        <h1 className="title">{title}</h1>
      </div>
      <div className="item">
        <h2 className="time">{date}</h2>
        <p className="place">
          The streaming will be on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/groups/DevC.Casablanca/"
          >
            DevC Casablanca Facebook Group{" "}
          </a>
        </p>
      </div>
      <div className="item">
        <a
          href={url}
          target="_blank"
          className="button outline"
          rel="noopener noreferrer"
        >
          Add to Calendar
        </a>
      </div>
    </div>
  )
}
