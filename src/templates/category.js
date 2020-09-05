import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Episode, Categories, EpisodesMenu } from "components/Blabla"

/**
 * Page created for each category.
 * This is the page that gets rendered when you hit a route like the following: /mss/
 * One thing to note is that we pass the category we get from pageContext to the EpisodesMenu component
 * EpisodesMenu will use this category to know whether it should render a menu that renders all episodes using StaticQuery ...
 * ... or if it should render a menu with the filtered episodes we get from the below query.
 * The idea is to be able to use the EpisodesMenu component in both cases and let the EpisodesMenu make the decision.
 */

export default ({ data: { allMdx }, pageContext: { category } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout>
      <SEO />
      <div className="container categories">
        <Categories />
      </div>
      <div className="container blablas">
        <EpisodesMenu
          category={category}
          filteredEpisodes={allMdx}
          selectedEpisode={lastEpisode.id}
        />
        <Episode {...lastEpisode.fields} description={lastEpisode.body} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($category: String) {
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
            category
            audio
          }
          body
        }
      }
    }
  }
`
