import React from "react"
import { graphql } from "gatsby"
import SEO from "components/SEO"
import Layout from "components/Layout"
import { Episode, Tags, EpisodesMenu } from "components/Blabla"

/**
 * Page created for each tag.
 * This is the page that gets rendered when you hit a route like the following: /mss/
 * One thing to note is that we pass the tag we get from pageContext to the EpisodesMenu component
 * EpisodesMenu will use this tag to know whether it should render a menu that renders all episodes using StaticQuery ...
 * ... or if it should render a menu with the filtered episodes we get from the below query.
 * The idea is to be able to use the EpisodesMenu component in both cases and let the EpisodesMenu make the decision.
 */

export default ({ data: { allMdx }, pageContext: { tag } }) => {
  const lastEpisode = allMdx.edges[0].node
  return (
    <Layout>
      <SEO tags={[tag]} />
      <div className="container tags">
        <Tags />
      </div>
      <div className="container blablas">
        <EpisodesMenu
          tag={tag}
          filteredEpisodes={allMdx}
          selectedEpisode={lastEpisode.id}
        />
        <Episode {...lastEpisode.fields} description={lastEpisode.body} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true }, tags: { in: [$tag] } } }
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
  }
`
