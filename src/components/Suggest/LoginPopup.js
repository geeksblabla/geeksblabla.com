import React, { useContext } from "react"
import Popup from "reactjs-popup"
import { Auth0Context } from "./auth0"

export default React.forwardRef((props, ref) => {
  const { login } = React.useContext(Auth0Context)

  return (
    <Popup
      ref={ref}
      contentStyle={contentStyle}
      overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="login-popup">
        <div>
          <h1> Sign up to suggest and vote. </h1>
          <p>
            We require Sign up to secure suggestion process.
            <br /> You just need 10s to sign up
          </p>
        </div>
        <button className="button" onClick={login}>
          Sing Up
        </button>
      </div>
    </Popup>
  )
})

const contentStyle = {
  backgroundColor: "#000",
  border: `1px solid rgba(255, 255, 255, 0.3)`,
  padding: `0px`,
  fontSize: `16px`,
  lineHeight: `24px`,
  width: "auto",
  color: `rgba(255, 255, 255, 0.6)`,
}
