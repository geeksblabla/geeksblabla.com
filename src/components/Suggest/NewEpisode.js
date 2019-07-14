import React from "react"
import { ApolloProvider, Mutation } from "react-apollo"
import "./index.scss"
import EpisodesList from "./EpisodesList"
import UserProvider from "./UserContext"
import { silentAuth, handleAuthentication } from "./auth"
import { CREATE_NEW_EPISODE } from "./graphql"

const ADD_TODO = ""
export default class NewEpisode extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_NEW_EPISODE}>
        {(addEpisode, { data, loading }) => (
          <form
            className="suggest"
            onSubmit={e => {
              e.preventDefault()

              const variables = {
                data: {
                  description: this.description.value,
                  guest: this.guests.value,
                  verified: false,
                  scheduled: false,
                  done: false,
                  email: "yjosejose@gmail.com",
                  name: "youssouf elazizi",
                },
              }
              addEpisode({ variables })
              console.log(variables)

              //addTodo({ variables: { type: input.value } })
              //this.description.value = ""
              //this.guests.value = ""
            }}
          >
            <h1> Suggest us a Geek Blabla Episode! </h1>
            <textarea
              defaultValue="suggest a new episode "
              rows="4"
              ref={node => {
                this.description = node
              }}
            />
            <p className="desc">
              *Please verify that the suggestion does not exist below
            </p>
            <br />
            <textarea
              defaultValue="suggest guests "
              rows="2"
              ref={node => {
                this.guests = node
              }}
            />
            <button type="submit" className="button" disabled={loading}>
              {" "}
              submit
            </button>
          </form>
        )}
      </Mutation>
    )
  }
}
