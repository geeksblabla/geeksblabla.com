import React, { useState, useEffect, useContext } from "react"
import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: "dev-1858wkib.eu.auth0.com",
      clientID: "rESg731YGZHRrfbsnnPhJZlP9Mtyp7n0",
      redirectUri: `${window.location.origin}/suggest-new-episode`, //process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

export const Auth0Context = React.createContext()
export const Auth0Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    (isBrowser && localStorage.getItem("isLoggedIn")) || 0
  )
  const [user, setUser] = useState(
    (isBrowser && JSON.parse(localStorage.getItem("user"))) || {}
  )

  useEffect(
    () =>
      isBrowser && window.localStorage.setItem("isLoggedIn", isAuthenticated),
    [isAuthenticated]
  )
  useEffect(
    () =>
      isBrowser && window.localStorage.setItem("user", JSON.stringify(user)),
    [user]
  )

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      handleAuthentication()
    } else {
      console.log("silent mode ")
      silentAuth()
    }
    // eslint-disable-next-line
  }, [])

  const handleAuthentication = () => {
    if (!isBrowser) {
      return
    }
    auth.parseHash((err, authResult) => {
      setSession(err, authResult)
      navigate(window.location.pathname)
    })
  }
  const silentAuth = () => {
    if (!isAuthenticated) return
    auth.checkSession({}, setSession)
  }

  const login = () => {
    if (!isBrowser) {
      return
    }
    auth.authorize()
  }

  const logout = () => {
    setIsAuthenticated(0)
    setUser({})
    auth.logout()
  }

  const setSession = (err, authResult) => {
    if (err) {
      console.log("error ", err)
      return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
      setUser(authResult.idTokenPayload)
      setIsAuthenticated(1)
    }
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
