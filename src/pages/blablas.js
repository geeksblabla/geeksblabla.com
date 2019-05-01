import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodeItem from "../components/EpisodeItem"

export default () => (
  <Layout
    withNextEpisode
    mainStyle={{
      marginTop: "100px",
    }}
  >
    <Helmet>
      <script
        async
        defer
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"
      />
    </Helmet>
    <ul className="episodes-list">
      <EpisodeItem active />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
      <EpisodeItem />
    </ul>
    <Episode
      style={{
        alignSelf: "flex-start",
        width: "100%",
      }}
    />
    <div id="fb-root" />
  </Layout>
)
