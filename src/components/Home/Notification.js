import React from "react"
import { Link } from "gatsby"

import Notif from "assets/notification.svg"
import NotifIcon from "assets/notif.svg"

export default () => {
  return (
    <div className="notification">
      <Notif className="notif" />
      <div className="content">
        <h1> Get notified for new episodes </h1>
        <p> We would like to Notify as soon as we have new episodes </p>
        <div className="actions">
          <Link to="/blablas" className="button">
            <NotifIcon width="20" /> Notify Me
          </Link>
        </div>
      </div>
    </div>
  )
}
