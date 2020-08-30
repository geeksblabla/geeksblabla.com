import React from "react"
import { StaticQuery, graphql } from "gatsby"
import TagItem from "../TagItem"
import "./index.scss"

export default ({ selectedTag }) => (
  <StaticQuery
    query={graphql`
      {
        allMdx(filter: { frontmatter: { published: { eq: true } } }) {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `}
    render={({ allMdx }) => (
      <ul className="tags-list">
        {allMdx.group
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(({ tag, totalCount }) => (
            <TagItem
              active={selectedTag === tag}
              key={tag}
              tag={tag}
              totalCount={totalCount}
            />
          ))}
      </ul>
    )}
  />
)
