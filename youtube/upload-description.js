const url = require("url")
const { google } = require("googleapis")

const uploadDescription = async ({ youtubeUrl, description, auth }) => {
  const service = google.youtube("v3")

  const id = url.parse(youtubeUrl, true).query.v
  const existingVideo = await service.videos.list({ id, part: "snippet", auth })

  const response = await service.videos.update({
    part: "snippet",
    auth,
    requestBody: {
      id: url.parse(youtubeUrl, true).query.v,
      snippet: {
        title: existingVideo.data.items[0].snippet.title,
        categoryId: existingVideo.data.items[0].snippet.categoryId,
        description,
      },
    },
  })
}

module.exports = uploadDescription
