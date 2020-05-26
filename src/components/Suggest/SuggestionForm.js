import React, { useState, useEffect, useRef } from "react"
// import { Mutation } from "@apollo/client"
import { useMutation } from "@apollo/client"

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

  const [addEpisode, { data, loading }] = useMutation(CREATE_NEW_EPISODE, {
    onCompleted: () => {
      popup.current.openPopup()
      setDescription("")
      setGuest("")
    },
  })

  return (
    <form
      onSubmit={(e) => {
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
        addEpisode({
          variables,
        })
      }}
    >
      <h1> Suggest a GeeksBlabla Episode ! </h1>
      <div className="input">
        <label htmlFor="episode"> EPISODE : </label>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please explain your suggestion as much as possible "
          rows="5"
          value={description}
          id="episode"
        />
        <p className="desc">
          *Please verify that the suggestion does not exist already{" "}
          <span className="web-only" role="img" aria-label="Pointing Right">
            👉{" "}
          </span>
          <span className="mobile-only" role="img" aria-label="Pointing Down">
            👇
          </span>
        </p>
      </div>

      <div className="input">
        <label htmlFor="guest"> GUEST(s) : </label>
        <textarea
          onChange={(e) => setGuest(e.target.value)}
          placeholder="Suggest a Guest, name, profile links ..."
          rows="3"
          value={guest}
          id="guest"
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading && " Suggest Episode ..."}
        {!loading && " Suggest Episode"}
      </button>
      <ThanksPopup ref={popup} />
    </form>
  )
}
