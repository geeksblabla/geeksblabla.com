module.exports = `
{
  blablas: allBlablasYaml (
    filter: { published: { ne: false } }
    sort: { order: DESC, fields: [date] }
  ) {
    edges {
      node {
        id
        title
        fields {
          slug
        }
      }
    }
  }
}
`
