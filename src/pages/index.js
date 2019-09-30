import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/SEO"

import "./index.scss"

const IndexPage = ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node

  return (
    <Layout withNextEpisode backImage>
      <SEO />
      <div className="intro">
        <h1>
          Enjoy Top Tech <br /> Topics In Darija <br /> With GeeksBlabla
        </h1>
        <Link to="blablas" className="button">
          See All Blablas
        </Link>
      </div>
      <Episode
        label="last episode"
        {...lastEpisode.fields}
        placeholder
        description={lastEpisode.excerpt}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: { published: { eq: true }, isNext: { eq: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          fields {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            duration
            url
            video
          }
        }
      }
    }
  }
`
