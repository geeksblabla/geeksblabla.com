import gql from "graphql-tag"

export const GET_EPISODES = gql`
  {
    verifiedEpisodes(verified: false) {
      data {
        _id
        description
        guest
        verified
        scheduled
        done
        email
        name
        votes {
          data {
            _id
            email
          }
        }
      }
    }
  }
`
