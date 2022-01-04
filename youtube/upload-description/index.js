const url = require("url")
const { google } = require("googleapis")
const getAuth = require("./get-auth")

const uploadDescription = async ({ youtubeUrl, description }) => {
  const service = google.youtube("v3")
  const auth = await getAuth()

  const id = url.parse(youtubeUrl, true).query.v
  const existingVideo = await service.videos.list({ id, part: "snippet", auth })

  return service.videos.update({
    part: "snippet",
    auth,
    requestBody: {
      id,
      snippet: {
        title: existingVideo.data.items[0].snippet.title,
        categoryId: existingVideo.data.items[0].snippet.categoryId,
        description,
      },
    },
  })
}

module.exports = uploadDescription
