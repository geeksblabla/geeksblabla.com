const process = require("process")
const url = require("url")
const { google } = require("googleapis")

const uploadDescription = async ({ youtubeUrl, description, auth }) => {
  const service = google.youtube("v3")

  const response = await service.videos.update({
    part: "snippet",
    auth: auth,
    requestBody: {
      id: url.parse(youtubeUrl, true).query.v,
      snippet: {
        title: "Updated title 2",
        categoryId: "27",
        description,
      },
    },
  })
}

module.exports = uploadDescription
