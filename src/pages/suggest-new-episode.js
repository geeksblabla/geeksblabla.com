import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Suggest from "../components/Suggest"

const NotFoundPage = () => (
  <Layout>
    <SEO title=" suggest new episode" />
    <Suggest />
  </Layout>
)

export default NotFoundPage
