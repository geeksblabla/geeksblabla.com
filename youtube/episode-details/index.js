const fs = require("fs")
const fm = require("front-matter")
const markdownToYTDescription = require("./markdown-to-youtube-description")
const more_details = require("./more_details")
const getFileLink = require("./get-file-link")
const YOUTUBE_MAX_DESCRIPTION_LENGTH = 5000

const getEpisodeDetails = (file) => {
  const fileContent = fs.readFileSync(file, "utf8")
  const body = markdownToYTDescription(fm(fileContent).body)
  const footer = getFileLink(file)
  const des = `${body}${more_details}`.substring(
    0,
    YOUTUBE_MAX_DESCRIPTION_LENGTH - (footer.length + 10)
  )
  const description = `${des}${footer}`

  const meta = fm(fileContent)
  const youtubeUrl = meta.attributes.youtube // you can get the id directly here
  return { youtubeUrl, description }
}

module.exports = getEpisodeDetails
