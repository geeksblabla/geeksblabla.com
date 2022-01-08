const path = require("path")

const getEpisodeDetails = require("../episode-details/get-episode-details")

describe("Youtube workflow ", () => {
  test("should return the correct episode description and youtube url ", () => {
    const file = path.resolve(__dirname, "./episode.md")

    const { description, youtubeUrl } = getEpisodeDetails(file)

    console.log(description)
    expect(youtubeUrl).toBe("https://www.youtube.com/watch?v=T0ebJvUiDG4")
    expect(description).toMatchSnapshot()

    expect(true).toBe(true)
  })
})
