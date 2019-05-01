import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodeItem from "../components/EpisodeItem"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({
  data: {
    mdx: { fields, code },
  },
}) => {
  return (
    <Layout
      withNextEpisode
      mainStyle={{
        marginTop: "100px",
        alignItems: "flex-start",
      }}
    >
      <Helmet>
        <script
          async
          defer
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
        />
      </Helmet>
      <EpisodesMenu />
      <Episode
        style={{
          alignSelf: "flex-start",
          width: "100%",
        }}
        {...fields}
        description={code.body}
      />
      <div id="fb-root" />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      id
      fields {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        duration
        url
        video
      }
      code {
        body
      }
    }
  }
`
