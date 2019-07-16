import React, { useState, useEffect, useContext, useRef } from "react"
import { Mutation } from "react-apollo"
import { CREATE_NEW_EPISODE } from "./graphql"
import { Auth0Context } from "./auth0"
import ThanksPopup from "./ThanksPopup"

import "./index.scss"

const isBrowser = typeof window !== "undefined"

export default () => {
  const { user, isAuthenticated, openPopup } = React.useContext(Auth0Context)
  const popup = useRef(null)
  const initialValues = (isBrowser &&
    JSON.parse(localStorage.getItem("suggestForm"))) || {
    description: "",
    guest: "",
  }
  const [description, setDescription] = useState(initialValues.description)
  const [guest, setGuest] = useState(initialValues.guest)

  useEffect(
    () =>
      isBrowser &&
      window.localStorage.setItem(
        "suggestForm",
        JSON.stringify({ description, guest })
      ),
    [guest, description]
  )

  return (
    <Mutation mutation={CREATE_NEW_EPISODE}>
      {(addEpisode, { data, loading }) => {
        if (data) {
          popup.current.openPopup()
          setDescription("")
          setGuest("")
        }

        return (
          <form
            onSubmit={e => {
              e.preventDefault()
              if (!isAuthenticated) {
                openPopup()
                return
              }
              const variables = {
                data: {
                  description: description,
                  guest: guest,
                  verified: false,
                  scheduled: false,
                  done: false,
                  email: user.email,
                  name: user.name,
                },
              }

              addEpisode({ variables })
            }}
          >
            <h1> Suggest us a GeeksBlabla Episode ! </h1>
            <div className="input">
              <label> EPISODE : </label>
              <textarea
                required
                onChange={e => setDescription(e.target.value)}
                placeholder="Please explain your suggestion as mach as possible "
                rows="5"
                value={description}
              />
              <p className="desc">
                *Please verify that the suggestion does not exist{" "}
                <span className="web-only">👉 </span>
                <span className="mobile-only">👇</span>
              </p>
            </div>

            <div className="input">
              <label> GUEST(s) : </label>
              <textarea
                onChange={e => setGuest(e.target.value)}
                placeholder="Suggest us a guest, name, profile links ..."
                rows="3"
                value={guest}
              />
            </div>
            <button type="submit" className="button" disabled={loading}>
              {loading && " Suggest Episode ..."}
              {!loading && " Suggest Episode"}
            </button>
            <ThanksPopup ref={popup} />
          </form>
        )
      }}
    </Mutation>
  )
}
