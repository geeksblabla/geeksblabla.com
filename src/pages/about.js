import React from "react"

import Layout from "components/Layout"
import SEO from "components/SEO"
import { Hero, Contributors, ContactUs } from "components/About"

export default () => (
  <Layout>
    <SEO />
    <Hero />
    <Contributors />
    <ContactUs />
  </Layout>
)
