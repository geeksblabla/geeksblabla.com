import React, { useState, useEffect, useContext } from "react"
import { Mutation } from "react-apollo"
import { CREATE_NEW_EPISODE } from "./graphql"
import { Auth0Context } from "./auth0"

import "./index.scss"

const isBrowser = typeof window !== "undefined"

export default () => {
  const { user, isAuthenticated, openPopup } = React.useContext(Auth0Context)
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
      {(addEpisode, { data, loading }) => (
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
                name: "youssouf elazizi",
              },
            }
            //addEpisode({ variables })
            console.log(variables)
          }}
        >
          <h1> Suggest us a Geek Blabla Episode! </h1>
          <div className="input">
            <label> EPISODE </label>
            <textarea
              required
              onChange={e => setDescription(e.target.value)}
              placeholder=" Please explain you suggestion as mach as possible "
              rows="4"
              value={description}
            />
            <p className="desc">
              *Please verify that the suggestion does not exist below
            </p>
          </div>

          <div className="input">
            <label> GUEST(s) </label>
            <textarea
              required
              onChange={e => setGuest(e.target.value)}
              placeholder="Guest Name, profile links ..."
              rows="3"
              value={guest}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            Suggest Episode
          </button>
        </form>
      )}
    </Mutation>
  )
}
