import React from "react"
import Popup from "reactjs-popup"
import { Auth0Context } from "./auth0"
import { useTheme } from "components/Theme/ThemeContext"

export default React.forwardRef((props, ref) => {
  const { login } = React.useContext(Auth0Context)
  const { dark } = useTheme()

  return (
    <Popup
      ref={ref}
      contentStyle={getContentStyle(dark)}
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

const getContentStyle = (dark) => ({
  backgroundColor: dark ? "#121334" : "#fff",
  border: dark ? `1px solid #7577a6` : `1px solid #31337e`,
  padding: `0px`,
  width: "auto",
})
