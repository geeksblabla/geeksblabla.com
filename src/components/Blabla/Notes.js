import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import mdxComponents from "components/mdx"

export default ({ content }) => (
  <div className="notes">
    <React.Fragment>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{content}</MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  </div>
)
