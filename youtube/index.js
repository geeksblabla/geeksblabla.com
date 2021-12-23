const fs = require("fs")
const process = require("process")
const { markdownToTxt } = require("markdown-to-txt")

const youtubeURL = process.argv[2]
const episodeFile = process.argv[3]

const strippedMarkdown = markdownToTxt(fs.readFileSync(episodeFile, "utf8"))
console.log(JSON.stringify({ url: youtubeURL, description: strippedMarkdown }))
