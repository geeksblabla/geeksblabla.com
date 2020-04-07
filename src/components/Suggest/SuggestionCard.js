/* eslint-disable */
import React, { useEffect } from "react"
import { Auth0Context } from "./auth0"
import { client, LIKE, DISLIKE, GET_EPISODES, MY_VOTES } from "./graphql"
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
  const {
    user,
    isAuthenticated,
    openPopup,
    votes: userVotes,
  } = React.useContext(Auth0Context)

  const [likes, setLikes] = React.useState(votes.data ? votes.data.length : 0)
  const [isVoted, setIsVoted] = React.useState(
    !!votes.data.filter((x) => userVotes.includes(x._id))[0]
  )

  useEffect(() => {
    setIsVoted(!!votes.data.filter((x) => userVotes.includes(x._id))[0])
  }, [userVotes, votes.data])

  const handelClick = async () => {
    if (!isAuthenticated) {
      openPopup()
      return
    }
    setIsVoted(!isVoted)
    setLikes(isVoted ? likes - 1 : likes + 1)
    if (isVoted) {
      const vote = votes.data.filter((x) => userVotes.includes(x._id))[0]
      if (vote)
        await client.mutate({
          mutation: DISLIKE,
          variables: { id: vote._id },
          refetchQueries: [
            { query: GET_EPISODES },
            { query: MY_VOTES, variables: { email: user.email } },
          ],
        })
    } else {
      const { data } = await client.mutate({
        mutation: LIKE,
        variables: {
          data: { email: user.email, episode: { connect: episodeId } },
        },
        refetchQueries: [
          { query: GET_EPISODES },
          { query: MY_VOTES, variables: { email: user.email } },
        ],
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
