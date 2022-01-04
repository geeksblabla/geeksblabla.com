const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()
const process = require("process")
const getEpisodeDetails = require("./episode-details")
const uploadDescription = require("./upload-description")

const syncEpisodeDescription = async () => {
  const episodeFile = process.argv[2]
  if (!episodeFile.includes("blablas")) {
    console.log(`Not an episode, skipping`)
    return
  }

  try {
    console.log(`👉  Parsing description and youtube URL from ${episodeFile}`)
    const { youtubeUrl, description } = getEpisodeDetails(episodeFile)
    console.log(youtubeUrl, description)

    console.log(`Uploading description to ${youtubeUrl}...`)
    await uploadDescription({ youtubeUrl, description })
    console.log(`👉  Episode description updated Successfully ✅ `)
  } catch (e) {
    console.error("Failed to update video description")
    console.error(e)
    process.exit(1)
  }
}

syncEpisodeDescription()
