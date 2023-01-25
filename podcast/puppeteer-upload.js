// inspired by https://github.com/Schrodinger-Hat/youtube-to-anchorfm/blob/main/index.js
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

  await page.setViewport({ width: 2800, height: 1800 })

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
  await page.waitForXPath(
    "//button[contains(., 'Save episode') and not(boolean(@disabled))]",
    { timeout: UPLOAD_TIMEOUT }
  )
  const [saveButton] = await page.$x(
    "//button[contains(., 'Save episode') and not(boolean(@disabled))]"
  )
  await saveButton.click()
  await navigationPromise

  console.log("👉  Adding title and description")
  await page.waitForSelector("#title", { visible: true })
  await page.waitForTimeout(2000)
  await page.type("#title", episode.title)

  //   await page.click("label[for='description'] > div > div > button")
  const [switchToHTMLButton] = await page.$x("//button[contains(., 'HTML')]")
  if (switchToHTMLButton) {
    await switchToHTMLButton.click()
  } else {
    console.log("❌  No switch to HTML button")
  }

  await page.waitForSelector("textarea[name=description]", { visible: true })
  await page.type("textarea[name=description]", episode.description)

  console.log("👉  Save as Draft")
  const [saveAsDraftButton] = await page.$x("//button[contains(., 'draft')]")
  if (saveAsDraftButton) {
    await saveAsDraftButton.click()
  }
  // await page.click("div.css-1bfy0s > button.styles__button___2oNPe.css-1w1qxic")
  await navigationPromise

  await browser.close()
  console.log(
    "👉  The episode has been successfully submitted as draft to Anchor ✅"
  )
}

module.exports = upload
