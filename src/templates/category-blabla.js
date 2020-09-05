import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Episode, EpisodesMenu, Categories } from "components/Blabla"

/**
 * This component serves as a template for pages under the route: `/${category}/${episodeTitle}/
 */

export default ({ data: { mdx, allMdx }, pageContext: { category } }) => {
  const { fields, body, excerpt } = mdx
  return (
    <Layout withNextEpisode>
      <div className="container categories">
        <Categories selectedCategory={category} />
      </div>
      <div className="container blablas">
        <SEO
          tags={fields.tags}
          isEpisode
          title={fields.title}
          //leave the original slug
          postUrl={fields.slug}
          description={excerpt}
        />
        <EpisodesMenu category={category} filteredEpisodes={allMdx} />
        <Episode {...fields} description={body} excerpt={excerpt} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!, $category: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, category: { eq: $category } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
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
    }
    mdx(fields: { id: { eq: $id } }) {
      excerpt(pruneLength: 200)
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
        tags
        category
      }
      body
    }
  }
`
