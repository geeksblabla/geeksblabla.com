import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import mdxComponents from "components/mdx"

export default ({ content, repoLink }) => (
  <div className="notes">
    <React.Fragment>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{content}</MDXRenderer>
      </MDXProvider>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: 10,
          paddingTop: 20,
        }}
      >
        <a
          target="_blank"
          className="edit"
          rel="noopener noreferrer"
          href={repoLink}
        >
          Edit notes on GitHub
        </a>
      </div>
    </React.Fragment>
  </div>
)
