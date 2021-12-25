const fs = require("fs")
const process = require("process")
const { markdownToTxt } = require("markdown-to-txt")

const authorize = require("./get-tokens")
const uploadDescription = require("./upload-description")

;(async () => {
  const youtubeUrl = process.argv[2]
  const episodeFile = process.argv[3]

  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const redirectUrl = process.env.REDIRECT_URL
  const accessToken = process.env.ACCESS_TOKEN
  const refreshToken = process.env.REFRESH_TOKEN

  try {
    console.log("Logging in...")
    const auth = await authorize({
      clientId,
      clientSecret,
      redirectUrl,
      accessToken,
      refreshToken,
    })
    console.log("Parsing description...")
    const description = markdownToTxt(fs.readFileSync(episodeFile, "utf8"))

    console.log("Uploading description...")
    await uploadDescription({ youtubeUrl, description, auth })
    console.log("Updated description successfully!")
  } catch (e) {
    console.error("Failed to update video description")
    console.error(e)
    process.exitCode = 1
  }
})()
