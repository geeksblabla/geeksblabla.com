import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import patternDark from "assets/patterns/1.back.svg"
import patternLight from "assets/patterns/4.back.svg"
import { useTheme } from "../Theme/ThemeContext"

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
  const { dark } = useTheme()

  const data = useStaticQuery(contributorsQuery)
  const contributors = data.allContributor.edges
  return (
    <div
      className="contributors"
      style={{
        backgroundImage: `url(${dark ? patternDark : patternLight})`,
      }}
    >
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
          rel="noopener noreferrer"
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
  <a href={profile} target="_blank" rel="noopener noreferrer">
    <div className="contributor">
      <img src={avatar_url} alt={lastName} />
      <div className="back">
        <p>
          <span>{firstName}</span> <span>{lastName}</span>
        </p>
      </div>
    </div>
  </a>
)
