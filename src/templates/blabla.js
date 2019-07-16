import React from "react"
import SEO from "../components/SEO"
import Layout from "../components/Layout"
import Episode from "../components/Episode"
import EpisodesMenu from "../components/EpisodesMenu"

export default ({ data: { mdx } }) => {
  const { fields, code, excerpt } = mdx
  return (
    <Layout withNextEpisode>
      <div className="blablas">
        <SEO fields={fields} isEpisode postUrl={fields.slug} />
        <EpisodesMenu />
        <Episode
          style={{
            alignSelf: "flex-start",
            width: "100%",
          }}
          {...fields}
          description={code.body}
          excerpt={excerpt}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      excerpt(pruneLength: 100)
      id
      fields {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        duration
        url
        video
        repoLink
      }
      code {
        body
      }
    }
  }
`
