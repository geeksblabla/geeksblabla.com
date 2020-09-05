import React from "react"
import { Link } from "gatsby"
import "./index.scss"
import kebabCase from "lodash/kebabCase"

export default ({ category, active, totalCount }) => {
  return (
    <Link
      to={`/${kebabCase(category)}`}
      activeClassName="category-item active"
      className={active ? "category-item active" : "category-item"}
      aria-label="Filter by category"
    >
      <div>
        <p>
          {category}
          <span>{totalCount}</span>
        </p>
      </div>
    </Link>
  )
}
