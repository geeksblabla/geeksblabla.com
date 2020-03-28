// import { Link } from "gatsby"
// import NotifIcon from "assets/notif.svg"
import React from "react"
import Notif from "assets/notification.svg"
import "./index.scss"
import { GetNotification } from "../../OneSignal"

export default () => {
  return (
    <div className="notification" style={{ background: "#181942" }}>
      <Notif className="notif" />
      <div className="content">
        <h1> Get Notified </h1>
        <p> Get instant updates about GeeksBlaBla </p>
        <div className="actions">
          <GetNotification />
        </div>
      </div>
    </div>
  )
}
