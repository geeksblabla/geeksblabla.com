import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./index.scss"
const isBrowser = typeof window !== "undefined"

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
  const rs = Math.random() >= 0.5 ? reviews.slice(0, 7) : reviews.slice(7, 14)
  useEffect(() => {
    document.getElementById("review-scroll").scrollLeft = 80
    return () => {}
  }, [])

  return (
    <div className="reviews">
      <div className="container">
        <h5> What People say about GeeksBalabla </h5>
      </div>

      {isBrowser && (
        <div className="list slider" id="review-scroll">
          <div className="slide-track">
            {rs.map(({ node }) => (
              <Review {...node} key={node.id} />
            ))}
            {rs.map(({ node }) => (
              <Review {...node} key={`${node.id}2d`} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Review = ({ name, review, avatar, role, organization }) => (
  <div className="review">
    <img src={avatar.childImageSharp.fixed.src} alt={`${name} avatar`} />
    <div className="back">
      <p className="text">{review}</p>

      <p className="name">{name}</p>
      <p className="role">
        {role} {organization}
      </p>
    </div>
  </div>
)
