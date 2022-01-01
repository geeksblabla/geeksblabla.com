const fs = require("fs")
const process = require("process")

const authorize = require("./get-tokens")
const uploadDescription = require("./upload-description")
const getEpisodeDetails = require("./get-episode-details")

;(async () => {
  const youtubeUrl = process.argv[2]
  const episodeFile = process.argv[3]

  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const redirectUrl = process.env.REDIRECT_URL
  const accessToken = process.env.ACCESS_TOKEN
  const refreshToken = process.env.REFRESH_TOKEN
  const updatedFiles = process.env.UPDATED_FILES.trim().split(" ")

  console.log("Logging in...")
  const auth = await authorize({
    clientId,
    clientSecret,
    redirectUrl,
    accessToken,
    refreshToken,
  })

  for (const episodeFile of updatedFiles) {
    console.log(`Current file : ${episodeFile}`)
    if (!episodeFile.startsWith("blablas")) {
      console.log(`Not an episode, skipping`)
      continue
    }
    try {
      console.log(`👉  Parsing description and youtube URL from ${episodeFile}`)
      const { youtubeUrl, description } = getEpisodeDetails(episodeFile)

      console.log(`Uploading description to ${youtubeUrl}...`)
      await uploadDescription({ youtubeUrl, description, auth })
      console.log(`👉  Episode description updated Successfully ✅ `)
    } catch (e) {
      console.error("Failed to update video description")
      console.error(e)
      process.exitCode = 1
      continue
    }
  }
})()
