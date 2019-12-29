import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import {
  Hero,
  Statistics,
  EpisodesTypes,
  TopEpisodes,
  Reviews,
  Notification,
} from "components/Home"
import SEO from "components/SEO"

const IndexPage = ({ data: { allMdx } }) => {
  const lastEpisode = allMdx.edges[0].node

  return (
    <Layout withNextEpisode backImage>
      <SEO />
      <Hero />
      <Statistics />
      <EpisodesTypes />
      <TopEpisodes />
      <Reviews />
      <Notification />
      {/* <div className="intro">
        <h1>
          Enjoy Top Tech <br /> Topics In Darija <br /> With GeeksBlabla
        </h1>
        <div className="actions">
          <Link to="/blablas" className="button">
            See All Blablas
          </Link>
          <div className="podcast-channels">
            <a
              href="https://open.spotify.com/show/0UlTBXh7iH6x0HO6FgYzAD"
              target="_blank"
            >
              <img
                src={spotify}
                className="spotify podcast-icon"
                alt="spotify"
              />
            </a>
            <a
              href="https://podcasts.google.com/?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy84OGUzMDQ4L3BvZGNhc3QvcnNz"
              target="_blank"
            >
              <img
                src={google_podcast}
                className="google-podcast podcast-icon"
                alt="google-podcast"
              />
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/geeksblabla/id1449493227"
              target="_blank"
            >
              <img
                src={apple_podcast}
                className="apple-podcast podcast-icon"
                alt="apple-podcast"
              />
            </a>
          </div>
        </div>
      </div>
      <Episode
        label="last episode"
        {...lastEpisode.fields}
        placeholder
        description={lastEpisode.excerpt}
      /> */}
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
