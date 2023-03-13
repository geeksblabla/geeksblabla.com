const util = require("util")
const { audioFileBasePath } = require("./utils")

const exec = util.promisify(require("child_process").exec)

const audioFilePath = `${audioFileBasePath}/episode.m4a`

/*

download audio format form youtube

*/

const downloadAudioFormat = async (episode) => {
  const videoUrl = episode.videoUrl
  const youtubeDlCommand = `yt-dlp -o ${audioFilePath}  -f 'bestaudio[ext=m4a]' '${videoUrl}'`
  console.log(`👉  Downloading  ${videoUrl}  ...... 🏃‍♂️🏃‍♂️🏃‍♂️ `)
  console.log(
    `yt-dlp -o ${audioFilePath}  -f 'bestaudio[ext=m4a]' '${videoUrl}'`
  )
  const { stdout, stderr } = await exec(youtubeDlCommand)
  if (stderr) {
    console.error(`error: ${stderr}`)
  }
  console.log(`👉  Audio file Downloaded successfully ✅`)
}

module.exports = downloadAudioFormat
