import { Link } from "gatsby"
import { default as React } from "react"
import {
  Highlight,
  Hits,
  Index,
  Snippet,
  connectStateResults,
} from "react-instantsearch-dom"
const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h5>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h5>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const NoResult = () => (
  <div className="no-results">
    <p>No search results</p>
  </div>
)
const Results = connectStateResults(
  ({ searchState, searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? children : <NoResult />
)

const SearchResult = ({ indices, className }) => (
  <Results>
    <div className={className}>
      {indices.map((index) => (
        <HitsInIndex index={index} key={index.name} />
      ))}
    </div>
  </Results>
)
export default SearchResult
