import React from "react"
import { Link } from "gatsby"
import FacebookPlayer from "./FacebookPlayer"
import Loader from "../Loader"
import EpisodesMenu from "../EpisodesMenu"

import "./index.scss"
import VideoPlaceHolder from "../Images/VideoPlaceHolder"

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
      id,
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
      guests,
      notes,
      prepared,
      links,
      ...props
    } = this.props
    const { ready } = this.state

    return (
      <div className="episode" {...props}>
        <div className="title">
          <h2> {title} </h2>
          <h5> {duration} </h5>
        </div>
        <span className='bock-intro'>{description}</span>
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
          <EpisodesMenu selectedEpisode={id} />
          <div className="markdown-description">
            <span style={{
                  display: `${guests.length > 0 ? "block" : "none"}`,
              }}>
              <h2>Guests</h2>
              <ul> 
              {
              guests.map((item,index) =>
               <li>
                 <a href={item.link}>{item.name}</a>
               </li>
              )
            } 
            </ul>
            </span>
            <h2>Notes</h2>
            <p className='notes'>
              {notes ? notes :`If you want contribute in Geksblabla project by adding the notes check` }
              <a href='https://github.com/DevC-Casa/geeksblabla.com/issues/23/' target='_blank' style={{visibility: `${notes ? "hidden" : "visible"}`,}}> this issue </a>
            </p>
            <span style={{
                display: `${prepared.length > 0 ? "block" : "none"}`,
            }}>
            <h2>Prepared and Presented by :</h2>
            <ul> 
              {
                prepared.map((item,index) =>
                <li>
                  <a href={item.link}>{item.name}</a>
                </li>
                )
              } 
            </ul>
            </span>
            <span style={{
                display: `${links.length > 0 ? "block" : "none"}`,
            }}>
            <h2>Links</h2>
            <ul> 
                {
                  links.map((item,index) =>
                  <li>
                    <p >{item.title} <a href={item.url}> check </a></p>
                  </li>
                  )
                } 
              </ul>
            </span>  
          </div>
        </div>
      </div>
    )
  }
}
