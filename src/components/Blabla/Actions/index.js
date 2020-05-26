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

export default ({ shareUrl, title: t }) => {
  const title = t + "#GeeksBalala #DevC_Casa"

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
    </div>
  )
}
