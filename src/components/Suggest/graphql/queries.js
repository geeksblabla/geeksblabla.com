import { gql } from "@apollo/client"

export const GET_EPISODES = gql`
  {
    verifiedEpisodes(verified: true) {
      data {
        _id
        description
        done
        votes {
          data {
            _id
          }
        }
      }
    }
  }
`

export const MY_VOTES = gql`
  query allVotesByUser($email: String!) {
    allVotesByUser(email: $email) {
      data {
        _id
      }
    }
  }
`
