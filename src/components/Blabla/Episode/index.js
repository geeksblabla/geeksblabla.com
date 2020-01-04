import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "components/Loader"
import mdxComponents from "components/mdx"
import "./index.scss"
import VideoPlaceHolder from "components/Images/VideoPlaceHolder"
import Actions from "../Actions"

export default class Episode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: !!props.placeholder,
    }
  }

  onReady = () => {
    this.setState({ ready: true })
  }
  onError = () => {
    console.log("facebook video player error ")
    this.setState({ ready: true })
  }

  render() {
    const {
      title,
      slug,
      date,
      duration,
      placeholder,
      label,
      video,
      description,
      repoLink,
      excerpt,
      ...props
    } = this.props
    const { ready } = this.state

    return (
      <div className="episode" {...props}>
        {label && <span className="label"> last Episode </span>}
        {!ready && <Loader />}
        {placeholder ? (
          <Link to={`/${slug}`}>
            <VideoPlaceHolder />
          </Link>
        ) : (
          <FacebookPlayer
            videoId={video}
            onReady={this.onReady}
            onError={this.onError}
          />
        )}

        <div
          className={!placeholder ? "info placeholder" : "info"}
          style={{
            visibility: `${ready ? "visible" : "hidden"}`,
          }}
        >
          <div className="title">
            <p>{date}</p>
            <h1> {title} </h1>
            <Actions
              repoLink={repoLink}
              title={title}
              shareUrl={`https://geeksblabla.com/${slug}`}
            />
          </div>
          <div className="notes">
            {!placeholder && (
              <React.Fragment>
                <MDXProvider components={mdxComponents}>
                  <MDXRenderer>{description}</MDXRenderer>
                </MDXProvider>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}
