import React from "react"
import "./index.scss"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share"

export default ({ repoLink, shareUrl, title: t }) => {
  const title = t + "#GeeksBalala #DevC_Casa"
  console.log(shareUrl)

  return (
    <div className="episode-actions">
      <div className="share">
        {/* <p> Share Episode On : </p> */}
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          windowWidth={750}
          windowHeight={600}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <a
        target="_blank"
        className="edit"
        rel="noopener noreferrer"
        href={repoLink}
      >
        Edit Notes
      </a>
    </div>
  )
}
