const Parser = require("rss-parser")
const showdown = require("showdown")

const parser = new Parser()
const converter = new showdown.Converter()
converter.setOption("metadata", true)

/*
this function will check anchor rss and  compare and get the last episode number
*/
const getMissedEpisodeNumber = async () => {
  console.log(`👉  Fetch Missed Episode ...... 🏃‍♂️🏃‍♂️🏃‍♂️ `)
  try {
    const AnchorEpisodes = await parser.parseURL(
      "https://anchor.fm/s/88e3048/podcast/rss"
    )
    const epNum = AnchorEpisodes.items.length
    return epNum
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = getMissedEpisodeNumber
