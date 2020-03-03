import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const contributorsQuery = graphql`
  {
    allContributor {
      edges {
        node {
          id
          login
          name
          profile
          avatar_url
          contributions
          firstName
          lastName
        }
      }
    }
  }
`

export default () => {
  const data = useStaticQuery(contributorsQuery)
  const contributors = data.allContributor.edges
  return (
    <div className="contributors">
      {/* <h1>Contributors </h1> */}
      <h4 className="desc">
        Join our contributors family and help us coding, fixing bugs, writing
        episodes notes and much more ...{" "}
      </h4>
      <div className="actions">
        <a
          href="https://github.com/DevC-Casa/geeksblabla.com"
          className="button outline"
          target="_blank"
        >
          I Want to Contribute?
        </a>
      </div>
      <div className=" container list">
        {contributors.map(({ node: { id, ...node } }) => (
          <Contributor {...node} key={id} />
        ))}
      </div>
    </div>
  )
}

const Contributor = ({ firstName, lastName, avatar_url, profile }) => (
  <a href={profile} target="_blank" rel="noopener">
    <div className="contributor">
      <img src={avatar_url} />
      <div className="back">
        <p>
          <span>{firstName}</span> <span>{lastName}</span>
        </p>
      </div>
    </div>
  </a>
)
