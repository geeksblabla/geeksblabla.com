import React from "react"
import { Auth0Context } from "./auth0"
import { client, LIKE, DISLIKE, GET_EPISODES } from "./graphql"
import { LikeIcon, DisLikeIcon } from "./icons"

export default ({ episode: { description, votes, _id } }) => {
  return (
    <div className="suggest-card">
      <Like votes={votes} episodeId={_id} />
      <p>{description}</p>
      <div className="icon" />
    </div>
  )
}

const Like = ({ votes, episodeId }) => {
  const { user, isAuthenticated, openPopup } = React.useContext(Auth0Context)

  const initialLikes = votes.data ? votes.data.length : 0
  const initialIsVoted = !!votes.data.filter(v => v.email === user.email)[0]
  const [likes, setLikes] = React.useState(initialLikes)
  const [isVoted, setIsVoted] = React.useState(initialIsVoted)

  const handelClick = async () => {
    if (!isAuthenticated) {
      openPopup()
      return
    }
    setIsVoted(!isVoted)
    setLikes(isVoted ? likes - 1 : likes + 1)
    if (isVoted) {
      const vote = votes.data.filter(v => v.email === user.email)[0]
      if (vote)
        await client.mutate({
          mutation: DISLIKE,
          variables: { id: vote._id },
          refetchQueries: [{ query: GET_EPISODES }],
        })
    } else {
      await client.mutate({
        mutation: LIKE,
        variables: {
          data: { email: user.email, episode: { connect: episodeId } },
        },
        refetchQueries: [{ query: GET_EPISODES }],
      })
    }
  }

  return (
    <div className="icon" onClick={handelClick}>
      {isVoted ? <LikeIcon /> : <DisLikeIcon />}
      {likes}
    </div>
  )
}
