import React from "react"
import { Link } from "gatsby"
import "./index.scss"
import kebabCase from "lodash/kebabCase"

export default ({ tag, active, totalCount }) => {
  return (
    <Link
      to={`/${kebabCase(tag)}`}
      activeClassName="tag-item active"
      className={active ? "tag-item active" : "tag-item"}
      aria-label="Filter by tag"
    >
      <div>
        <p>
          {tag}
          <span>{totalCount}</span>
        </p>
      </div>
    </Link>
  )
}
