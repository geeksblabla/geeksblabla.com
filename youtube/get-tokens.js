const { google } = require("googleapis")

const authorize = async ({
  clientId,
  clientSecret,
  redirectUrl,
  accessToken,
  refreshToken,
}) => {
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl
  )

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
  })
  return oauth2Client
}

module.exports = authorize
