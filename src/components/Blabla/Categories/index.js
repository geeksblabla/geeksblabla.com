import React from "react"
import { StaticQuery, graphql } from "gatsby"
import CategoryItem from "../CategoryItem"
import "./index.scss"

export default ({ selectedCategory }) => (
  <StaticQuery
    query={graphql`
      {
        allMdx(filter: { frontmatter: { published: { eq: true } } }) {
          group(field: frontmatter___category) {
            category: fieldValue
            totalCount
          }
        }
      }
    `}
    render={({ allMdx }) => (
      <ul className="categories-list">
        {allMdx.group
          .sort((a, b) => b.totalCount - a.totalCount)
          .map(({ category, totalCount }) => (
            <CategoryItem
              active={selectedCategory === category}
              key={category}
              category={category}
              totalCount={totalCount}
            />
          ))}
      </ul>
    )}
  />
)
