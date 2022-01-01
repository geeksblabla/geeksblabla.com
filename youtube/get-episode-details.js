const fs = require("fs")

const { markdownToTxt } = require("markdown-to-txt")
const fm = require("front-matter")

const getEpisodeDetails = (file) => {
  const fileContent = fs.readFileSync(file, "utf8")
  const description = markdownToTxt(fileContent)
  // read file meta
  const meta = fm(fileContent)
  const youtubeUrl = meta.attributes.youtube // you can get the id directly here
  return { youtubeUrl, description }
}

module.exports = getEpisodeDetails
