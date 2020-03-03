import React from "react"
import Popup from "reactjs-popup"
import { Auth0Context } from "./auth0"

export default React.forwardRef((props, ref) => {
  const { login } = React.useContext(Auth0Context)

  return (
    <Popup
      ref={ref}
      contentStyle={contentStyle}
      overlayStyle={{ backgroundColor: "rgba(25, 26, 68, 0.68)" }}
    >
      <div className="login-popup">
        <div className="content">
          <h1> Sign up to suggest and vote</h1>
          <p>
            We require Sign up to secure suggestion process.
            <br /> You just need 10s to sign up
          </p>
        </div>
        <div className="actions">
          <button className="button" onClick={login}>
            Sign Up
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
