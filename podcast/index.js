const downloadAudioFormat = require("./download-audio-format")
const getEpisodeData = require("./get-episode-data")
const getMissedEpisodeNumber = require("./get-missed-episode")
const upload = require("./puppeteer-upload")

/*
- Check missed Episode ( usually should be One or Zero) : using the anchor geeksBalaba rss
const episode = {
  title: "#Num - Episode Title",
  videoUrl: "youtube url",
  description: " Html Format "
}
- Download Audio file from youtube using youtube-dl

- Upload Audio File using pruppeteer
*/

const upload_to_anchor = async () => {
  try {
    const episodeNumber = await getMissedEpisodeNumber()
    const episode = await getEpisodeData(episodeNumber)
    if (episode === null) return
    await downloadAudioFormat(episode)
    await upload(episode)
  } catch (error) {
    console.log("🚨 error uploading to anchor", error)
    process.exit()
  }
}

upload_to_anchor()
