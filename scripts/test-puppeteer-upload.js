const uploadToAnchor = require("./puppeteer-upload")

const testEpisodeData = {
  title: "This is a test episode title",
  description: "This is a test episode description",
}

const run_script = async () => {
  try {
    await uploadToAnchor({
      episode: testEpisodeData,
      audioFile: "test.m4a",
      debug: true,
    })
  } catch (error) {
    console.log("🚨 error uploading to anchor", error)
    process.exit()
  }
}

run_script()
