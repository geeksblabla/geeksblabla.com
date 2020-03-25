import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import mdxComponents from "components/mdx"
import TimeStamp from "components/TimeStamp"

export default ({ content }) => (
  <div className="notes">
    <React.Fragment>
      <MDXProvider components={{ mdxComponents, TimeStamp }}>
        <MDXRenderer>{content}</MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  </div>
)
