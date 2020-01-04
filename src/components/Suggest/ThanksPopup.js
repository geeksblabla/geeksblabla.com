import React from "react"
import Popup from "reactjs-popup"
import { Auth0Context } from "./auth0"

export default React.forwardRef((props, ref) => {
  const { user } = React.useContext(Auth0Context)

  return (
    <Popup
      ref={ref}
      contentStyle={contentStyle}
      overlayStyle={{ backgroundColor: "rgba(25, 26, 68, 0.68)" }}
    >
      <div className="login-popup">
        <div className="content">
          <h1> Thank you {user.given_name} for your contribution !</h1>
          <p>
            One of our team members will review your proposal as soon as
            possible. Your proposal will be soon available on Proposals section.
          </p>
        </div>
        <div className="actions">
          <button className="button" onClick={() => ref.current.closePopup()}>
            Done
          </button>
        </div>
      </div>
    </Popup>
  )
})

const contentStyle = {
  backgroundColor: "#121334",
  border: `1px solid #7577a6`,
  padding: `0px`,
  width: "auto",
}
