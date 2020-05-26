import { gql } from "@apollo/client"

export const LIKE = gql`
  mutation createVote($data: VoteInput!) {
    createVote(data: $data) {
      _id
      email
    }
  }
`
export const DISLIKE = gql`
  mutation deleteVote($id: ID!) {
    deleteVote(id: $id) {
      _id
    }
  }
`

export const CREATE_NEW_EPISODE = gql`
  mutation createEpisode($data: EpisodeInput!) {
    createEpisode(data: $data) {
      _id
    }
  }
`
