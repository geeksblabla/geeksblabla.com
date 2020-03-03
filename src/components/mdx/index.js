import React from "react"

export default {
  a: props => <a {...props} target="_blank" />,
  h1: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  h2: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
  h3: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
}
