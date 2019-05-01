import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import SEO from "../components/seo"

import "./reset.css"
import "./index.scss"

require("typeface-open-sans")

const IndexPage = ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node

  return (
    <Layout withNextEpisode backImage>
      <div className="intro">
        <h1>
          Enjoy Top Tech <br /> Topics In Darija <br /> With GeekBlablas
        </h1>
        <Link to="blablas" className="button">
          See All Blablas
        </Link>
      </div>
      <Episode
        label="last episode"
        {...lastEpisode.fields}
        placholder
        description={lastEpisode.code.body}
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
          id
          code {
            body
          }
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
