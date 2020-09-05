import React from "react"
import EpisodeItem from "../EpisodeItem"
import kebabCase from "lodash/kebabCase"

/**
 * This component maps over the filtered episodes and makes a new slug
 * The slug is constructed by converting the category and title to kebab-case
 * We then override the slug we get from mdx by the new slug.
 * This is done so that we can fully reuse the EpisodeItem component, which eventually renders a Link component...
 * ... with the slug as its `to` prop.
 * Other fields like the title, date, duration, etc. are passed down as well.
 */

export default ({ filteredEpisodes, selectedEpisode, category }) =>
  filteredEpisodes.edges.map(({ node }) => {
    const newSlug = `${kebabCase(category)}/${kebabCase(node.fields.title)}`
    const newFields = { ...node.fields, slug: newSlug }
    return (
      <EpisodeItem
        {...newFields}
        key={node.id}
        active={selectedEpisode === node.id}
      />
    )
  })
