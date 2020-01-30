import React from "react"

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

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
      <Statistics />
      <EpisodesTypes />
      <TopEpisodes />
      <Reviews />
      <Notification />
    </Layout>
  )
}

export default IndexPage
