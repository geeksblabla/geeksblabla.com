import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Suggest from "../components/Suggest"

const NotFoundPage = () => (
  <Layout>
    <SEO title=" Suggest New Episode" />
    <Suggest />
  </Layout>
)

export default NotFoundPage
