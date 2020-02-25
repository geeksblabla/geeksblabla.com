import React from "react"
import ErrorBoundary from "../ErrorBoundary"

import Header from "../Header"
import Footer from "../Footer"

export default ({ children }) => (
  <ErrorBoundary>
    <Header />
    {children}
    <Footer />
  </ErrorBoundary>
)
