/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// Load Roboto typeface
require("typeface-roboto")

const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

// in gastby-browser.js
exports.shouldUpdateScroll = ({
  prevRouterProps: {
    location: { pathname: prevPathName },
  },
  routerProps: {
    location: { pathname },
  },
}) => {
  if (w < 860) {
    return true
  }
  if (
    prevPathName.indexOf("blabla") !== -1 &&
    pathname.indexOf("blabla") !== -1
  ) {
    return false
  }

  return true
}
