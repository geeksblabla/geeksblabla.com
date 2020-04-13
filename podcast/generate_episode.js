const path = require("path")
const fs = require("fs")
const fm = require("front-matter")

const { exec } = require("child_process")
const Parser = require("rss-parser")
const showdown = require("showdown")

const parser = new Parser()
const converter = new showdown.Converter()
converter.setOption("metadata", true)
const logMessage = (msg) =>
  console.log(`****************************${msg}****************************`)

const generateMissedEpisode = async () => {
  logMessage("Start: Get Anchor Episode ")
  const AnchorEpisodes = await parser.parseURL(
    "https://anchor.fm/s/88e3048/podcast/rss"
  )
  logMessage("End: Get Anchor Episode ")
  try {
    // Generate Episode from Markdown File
    logMessage("Start: Generate Episode")
    const missedEpisodeFile = `../blablas/ep${AnchorEpisodes.items.length}/index.md`
    let fileContent = ""
    try {
      fileContent = fs.readFileSync(
        path.resolve(__dirname, missedEpisodeFile),
        "utf8"
      )
    } catch (error) {
      console.log(error)
      logMessage("No New Episode")
      return
    }

    const description = converter.makeHtml(fileContent)
    // read file meta
    const meta = fm(fileContent)
    const title = meta.attributes.title.replace(/&quot;/g, "")
    const videoUrl = `https://www.facebook.com/${meta.attributes.video.replace(
      /&quot;/g,
      ""
    )}`
    const basePath = path.resolve(__dirname, "../")
    const episode = JSON.stringify({ title, videoUrl, description })
    fs.writeFileSync(`${basePath}/cypress/fixtures/episode.json`, episode)

    logMessage("End: Generate Episode")
    logMessage("Start: Download Episode ")
    const youtubeDlCommand = `youtube-dl -o ${basePath}/cypress/fixtures/episode.m4a  -f 'bestaudio[ext=m4a]' '${videoUrl}'`
    exec(youtubeDlCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    })

    logMessage("End: Download Episode ")
  } catch (err) {
    console.error(err)
  }
}

generateMissedEpisode()
