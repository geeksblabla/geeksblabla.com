import React, { useState, useEffect, createRef } from "react"
import auth0 from "auth0-js"
import { navigate } from "gatsby"
import LoginPopup from "./LoginPopup"
import { client, MY_VOTES } from "./graphql"

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
  const p = createRef(null)
  const [isAuthenticated, setIsAuthenticated] = useState(
    (isBrowser && parseInt(localStorage.getItem("isLoggedIn"))) || 0
  )
  const [token, setToken] = useState(
    (isBrowser && localStorage.getItem("token")) || null
  )
  const [votes, setVotes] = useState(
    (isBrowser && localStorage.getItem("votes")) || []
  )
  const [user, setUser] = useState(
    (isBrowser && JSON.parse(localStorage.getItem("user"))) || {}
  )
  useEffect(() => isBrowser && window.localStorage.setItem("token", token), [
    token,
  ])

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
  useEffect(
    () =>
      isBrowser && window.localStorage.setItem("votes", JSON.stringify(votes)),
    [votes]
  )

  useEffect(() => {
    const getMyVotes = async () => {
      if (!!user.email) {
        const votes = await client.query({
          query: MY_VOTES,
          variables: { email: user.email },
          fetchPolicy: "network-only",
        })
        if (votes.data && votes.data.allVotesByUser.data)
          setVotes(votes.data.allVotesByUser.data.map((v) => v._id))
      }
    }
    getMyVotes()
  }, [user])

  useEffect(() => {
    if (window.location.hash.includes("access_token")) {
      handleAuthentication()
    } else {
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

  const openPopup = () => {
    p.current.openPopup()
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
      setIsAuthenticated(0)
      setUser({})
      return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
      setUser(authResult.idTokenPayload)
      setToken(authResult.idToken)
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
        openPopup,
        votes,
      }}
    >
      <React.Fragment>
        <LoginPopup ref={p} />
        {children}
      </React.Fragment>
    </Auth0Context.Provider>
  )
}
