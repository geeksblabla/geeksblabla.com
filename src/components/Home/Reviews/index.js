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
                src
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
    document.getElementById("review-scroll").scrollLeft = 80
    return () => {}
  }, [])

  return (
    <div className="reviews">
      <div className="container">
        <h5> What People say about GeeksBalabla </h5>
      </div>
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
    <img src={avatar.childImageSharp.fixed.src} />
    <div className="back">
      <p className="text">{review}</p>

      <p className="name">{name}</p>
      <p className="role">
        {role} {organization}
      </p>
    </div>
  </div>
)
