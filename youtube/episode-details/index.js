const fs = require("fs")
const fm = require("front-matter")
const markdownToYTDescription = require("./markdown-to-youtube-description")
const more_details = require("./more_details")
const getFileLink = require("./get-file-link")

const getEpisodeDetails = (file) => {
  const fileContent = fs.readFileSync(file, "utf8")
  const body = markdownToYTDescription(fm(fileContent).body)
  const file_link = getFileLink(file)
  const description = `${body}${more_details}${file_link}`
  // read file meta
  const meta = fm(fileContent)
  const youtubeUrl = meta.attributes.youtube // you can get the id directly here
  return { youtubeUrl, description }
}

module.exports = getEpisodeDetails
