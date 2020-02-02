import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
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

  useEffect(() => {
    document.getElementById("review-scroll").scrollLeft = 100
    return () => {}
  }, [])

  return (
    <div className="reviews">
      <h1> Reviews </h1>
      <div className="list slider" id="review-scroll">
        <div className="slide-track">
          {reviews.map(({ node }) => (
            <Review {...node} key={node.id} />
          ))}
          {reviews.map(({ node }) => (
            <Review {...node} key={`${node.id}2d`} />
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
      <p className="role">
        {role} {organization}
      </p>
    </div>
  </div>
)
