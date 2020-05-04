import path from "path"
import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import getShareImage from "@jlengstorf/get-share-image"
import PropTypes from "prop-types"
import SchemaOrg from "./SchemaOrg"
import config from "../../../config/website"

const socialImage = (title, tags) => {
  const titleFontSize = parseInt(101 - title.length * 0.84)
  return getShareImage({
    title: title,
    tagline: tags.map(tag => `#${tag}`).join(" "),
    cloudName: "duko2tssr",
    imagePublicID: "episode-template_sriwmj",
    titleExtraConfig: "_bold", // optional - set title font weight to bold
    //titleExtraConfig: "_line_spacing_-10",
    textColor: "FFFFFF",
    textLeftOffset: 94,
    textAreaWidth: 540,
    titleBottomOffset: 265,
    taglineTopOffset: 430,
    titleColor: "FFFFFF",
    taglineColor: "D81479",
    titleFontSize,
    taglineFontSize: 24,
    titleFont: "lato",
  })
}

const SEO = ({
  description: postDescription,
  postImage,
  isEpisode,
  postUrl,
  title: customTitle,
  tags = [],
}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            canonicalUrl
            image
            banner
            organization {
              name
              url
              logo
            }
            author {
              name
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: seo } }) => {
      const title = !!customTitle ? customTitle : config.siteTitle

      const description = !!postDescription ? postDescription : seo.description

      const image = isEpisode
        ? socialImage(title, [...tags, "Geeksblabla", "DevC_Casa"])
        : `${seo.canonicalUrl}/${seo.banner}`

      const url = postUrl
        ? `${seo.canonicalUrl}${path.sep}${postUrl}`
        : seo.canonicalUrl
      const datePublished = false

      return (
        <React.Fragment>
          <Helmet>
            {/* General tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isEpisode ? <meta property="og:type" content="article" /> : null}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {/* <meta property="fb:app_id" content={seo.social.fbAppID} /> */}

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            {/* <meta name="twitter:creator" content={seo.social.twitter} /> */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
          </Helmet>
          <SchemaOrg
            isEpisode={isEpisode}
            url={url}
            title={title}
            image={image}
            description={description}
            datePublished={datePublished}
            canonicalUrl={seo.canonicalUrl}
            author={seo.author}
            organization={seo.organization}
            defaultTitle={seo.title}
          />
        </React.Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  isEpisode: PropTypes.bool,
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isEpisode: false,
  postImage: null,
}

export default SEO
