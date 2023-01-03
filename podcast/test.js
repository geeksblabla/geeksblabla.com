const getEpisodeData = require("./get-episode-data")

const run_script = async () => {
  try {
    const episode = await getEpisodeData(134)
    if (episode === null) return
    console.log(episode.description.toString())
  } catch (error) {
    console.log("🚨 error uploading to anchor", error)
    process.exit()
  }
}

run_script()
