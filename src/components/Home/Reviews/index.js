import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Pattern from "assets/pattern.svg"
import "./index.scss"
export const query = graphql`
  {
    allIndexYaml {
      edges {
        node {
          id
          name
          review
          role
          organization
          avatar {
            childImageSharp {
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

export default () => {
  const data = useStaticQuery(query)
  const reviews = data.allIndexYaml.edges

  return (
    <div className="reviews">
      <Pattern width="100%" />
      <h1> Reviews </h1>
      <div className="list slider">
        <div className="slide-track">
          {reviews.map(({ node }) => (
            <Review {...node} key={node.id} />
          ))}
          {reviews.map(({ node }) => (
            <Review {...node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Review = ({ name, review, avatar, role, organization }) => (
  <div className="review">
    <Img fixed={avatar.childImageSharp.fixed} />
    <div className="back">
      <p className="text">{review}</p>
      <p className="name">{name}</p>
      <p className="role">{organization}</p>
    </div>
  </div>
)
