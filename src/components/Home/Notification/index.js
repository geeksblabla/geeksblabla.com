// import { Link } from "gatsby"
// import NotifIcon from "assets/notif.svg"
import React, { useContext } from "react"
import { ThemeContext } from "../../Theme/ThemeContext"
import Notif from "assets/notification.svg"
import NotifLight from "assets/notification_light.svg"
import "./index.scss"
import { GetNotification } from "../../OneSignal"

export default () => {
  const [theme] = useContext(ThemeContext)

  return (
    <div className="notification">
      {theme === "dark" ? (
        <Notif className="notif" />
      ) : (
        <NotifLight className="notif" />
      )}
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
