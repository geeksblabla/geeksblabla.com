const path = require("path")
const fs = require("fs")
const fm = require("front-matter")

const showdown = require("showdown")

const converter = new showdown.Converter()
converter.setOption("metadata", true)

/*
this function will check anchor rss and  compare it to blabla folder episode
will return last episode data in case number of episode are not equal

should covert markdown to HTML format for anchor description
*/
const getEpisodeData = async (epNum) => {
  try {
    const missedEpisodeFile = `../blablas/ep${epNum}/index.md`
    try {
      const fileContent = fs.readFileSync(
        path.resolve(__dirname, missedEpisodeFile),
        "utf8"
      )

      const description = converter.makeHtml(fileContent)
      // read file meta
      const meta = fm(fileContent)
      const title = `#${epNum} - ${meta.attributes.title.replace(
        /&quot;/g,
        ""
      )}`
      const videoUrl = meta.attributes.youtube
      const episode = { title, videoUrl, description }
      console.log(`👉  Episode Data collected Successfully ✅ `)
      return episode
    } catch (error) {
      console.log("👉  No  episode")
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = getEpisodeData
