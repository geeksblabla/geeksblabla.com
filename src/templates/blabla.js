import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Episode, EpisodesMenu } from "components/Blabla"

export default ({ data: { mdx } }) => {
  const { fields, body, excerpt } = mdx
  return (
    <Layout withNextEpisode>
      <div className="container blablas">
        <SEO fields={fields} isEpisode postUrl={fields.slug} />
        <EpisodesMenu />
        <Episode
          style={{
            alignSelf: "flex-start",
            width: "100%",
          }}
          {...fields}
          description={body}
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
        audio
      }
      body
    }
  }
`
