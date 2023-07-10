import React from "react"
import { Link } from "gatsby"
import "./index.scss"
import kebabCase from "lodash/kebabCase"

export default ({ category, active, totalCount }) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  return (
    <Link
      to={`/${kebabCase(category)}`}
      activeClassName="category-item active"
      className={active ? "category-item active" : "category-item"}
      aria-label="Filter by category"
    >
      <div>
        <p>
          {categoryName}
          <span>{totalCount}</span>
        </p>
      </div>
    </Link>
  )
}
