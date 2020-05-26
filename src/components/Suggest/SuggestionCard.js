/* eslint-disable */
import React, { useEffect } from "react"
import { Auth0Context } from "./auth0"
import { client, LIKE, DISLIKE } from "./graphql"
import { LikeIcon, DisLikeIcon } from "./icons"

const hasVoted = (userVotes, allVotes) =>
  allVotes.some((vote) => userVotes.includes(vote._id))

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

  const allVotes = votes.data

  const [likes, setLikes] = React.useState(allVotes ? allVotes.length : 0)
  const [isVoted, setIsVoted] = React.useState(hasVoted(userVotes, allVotes))

  useEffect(() => {
    setIsVoted(hasVoted(userVotes, allVotes))
  }, [userVotes, allVotes])

  const handleClick = () => {
    if (!isAuthenticated) {
      openPopup()
      return
    }
    setIsVoted(!isVoted)
    setLikes(isVoted ? likes - 1 : likes + 1)
    if (isVoted) {
      const vote = allVotes.filter((x) => userVotes.includes(x._id))[0]
      if (vote) {
        client
          .mutate({
            mutation: DISLIKE,
            variables: { id: vote._id },
          })
          .catch(() => {
            setIsVoted(true)
            setLikes(likes)
          })
      }
    } else {
      client
        .mutate({
          mutation: LIKE,
          variables: {
            data: { email: user.email, episode: { connect: episodeId } },
          },
        })
        .catch(() => {
          setIsVoted(false)
          setLikes(likes)
        })
    }
  }

  return (
    <div className="icon" onClick={handleClick}>
      {isVoted ? <LikeIcon /> : <DisLikeIcon />}
      {likes}
    </div>
  )
}
