const { google } = require("googleapis")

let auth = null

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUrl = process.env.REDIRECT_URL
const accessToken = process.env.ACCESS_TOKEN
const refreshToken = process.env.REFRESH_TOKEN

const getAuth = async () => {
  if (auth === null) {
    auth = new google.auth.OAuth2(clientId, clientSecret, redirectUrl)

    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    })
  }
  return auth
}

module.exports = getAuth
