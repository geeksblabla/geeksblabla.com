const path = require("path")
const puppeteer = require("puppeteer")

const basePath = path.resolve(__dirname, "../")
const audioFile = `${basePath}/podcast/episode.m4a`

/*

upload to anchor using puppeteer

*/

const email = process.env.ANCHOR_EMAIL
const password = process.env.ANCHOR_PASSWORD
const UPLOAD_TIMEOUT = process.env.UPLOAD_TIMEOUT || 60 * 7 * 1000

const upload = async (episode) => {
  console.log("👉  Launching puppeteer")
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] }) // to debug .launch({ devtools: true });
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.goto("https://anchor.fm/dashboard/episode/new")

  await page.setViewport({ width: 1600, height: 789 })

  await navigationPromise
  console.log("#email", email)
  await page.type("#email", email)
  await page.type("#password", password)
  await page.click("button[type=submit]")
  await navigationPromise
  console.log("👉  Logged in")
  await page.waitForSelector("input[type=file]")

  const inputFile = await page.$("input[type=file]")
  await inputFile.uploadFile(audioFile)
  console.log("👉  Uploading audio file")
  await page.waitForTimeout(25 * 1000)
  await page.waitForFunction(
    'document.querySelector(".styles__saveButton___lWrNZ").getAttribute("disabled") === null',
    { timeout: UPLOAD_TIMEOUT }
  )
  await page.click(".styles__saveButton___lWrNZ")
  await navigationPromise
  console.log("👉  Adding title and description")
  await page.waitForSelector("#title")
  await page.type("#title", episode.title)

  await page.click("div.css-1uh5hwd.css-1ago99h > label > div > div > button")

  await page.waitForSelector("textarea[name=description]")
  await page.type("textarea[name=description]", episode.description)

  console.log("👉  Save as Draft")
  await page.click("div.css-1bfy0s > button.styles__button___2oNPe.css-1w1qxic")
  await navigationPromise

  await browser.close()
  console.log(
    "👉  The episode has been successfully submitted as draft to Anchor ✅"
  )
}

module.exports = upload
