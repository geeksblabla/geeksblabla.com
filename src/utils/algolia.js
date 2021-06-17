function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}

const queries = [
  {
    query: `{
        allMdx(
          filter: {
            frontmatter: { published: { eq: true }, isNext: { eq: false } }
          }
        ) {
          edges {
            node {
              id
              fields {
                title
                slug
                duration
              }
              excerpt(pruneLength: 5000)
            }
          }
        }
      }`,
    transformer: ({ data }) => data.allMdx.edges.map(pageToAlgoliaRecord),
    indexName: "Blablas",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
module.exports = queries
