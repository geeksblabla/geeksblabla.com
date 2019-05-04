import React from "react"
import SEO from "components/SEO"
import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { mdx } }) => {
  const { fields, code } = mdx
  return (
    <Layout
      withNextEpisode
      mainStyle={{
        marginTop: "50px",
        alignItems: "flex-start",
      }}
    >
      <SEO fields={fields} isEpisode postUrl={fields.slug} />
      <EpisodesMenu />
      <Episode
        style={{
          alignSelf: "flex-start",
          width: "100%",
        }}
        {...fields}
        description={code.body}
      />
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
