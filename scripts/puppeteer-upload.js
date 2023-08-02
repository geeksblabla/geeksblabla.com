// inspired by https://github.com/Schrodinger-Hat/youtube-to-anchorfm/blob/main/index.js
const puppeteer = require("puppeteer")
const { audioFileBasePath } = require("./utils")

/*
upload to anchor using puppeteer
*/

const email = process.env.ANCHOR_EMAIL
const password = process.env.ANCHOR_PASSWORD
const UPLOAD_TIMEOUT = process.env.UPLOAD_TIMEOUT || 60 * 7 * 1000

async function clickDom(page, domBtn) {
  await page.evaluate((elem) => {
    elem.click()
  }, domBtn)
}

async function clickXpath(page, xpath, options = {}) {
  await page.waitForXPath(xpath, options)
  const [xpathBtn] = await page.$x(xpath)
  await clickDom(page, xpathBtn)
}

const uploadToAnchor = async ({
  episode,
  audioFile = "episode.m4a",
  debug = false,
}) => {
  console.log("👉  Launching puppeteer")
  let browser = null
  if (debug) {
    browser = await puppeteer.launch({ devtools: true })
  } else {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] })
  }
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.goto("https://podcasters.spotify.com/pod/dashboard/episode/new")
  await page.setViewport({ width: 1600, height: 789 })
  await new Promise((r) => {
    setTimeout(r, 5 * 1000)
  })
  await navigationPromise
  await clickXpath(page, '//button[contains(text(),"email")]')
  await new Promise((r) => {
    setTimeout(r, 20 * 1000)
  })
  await page.waitForSelector("#email")
  await page.type("#email", email)
  await page.type("#password", password)
  await page.click("button[type=submit]")
  await navigationPromise
  console.log("👉  Logged in")
  await page.waitForSelector("input[type=file]")

  const inputFile = await page.$("input[type=file]")
  const audioFilepath = `${audioFileBasePath}/${audioFile}`
  await inputFile.uploadFile(audioFilepath)

  console.log("👉  Uploading audio file")
  console.log("Waiting for upload to finish")
  await new Promise((r) => {
    setTimeout(r, 25 * 1000)
  })

  await clickXpath(
    page,
    '//span[contains(text(),"Save")]/parent::button[not(boolean(@disabled))]',
    { timeout: UPLOAD_TIMEOUT }
  )
  await navigationPromise

  console.log("👉  Adding title and description")
  await page.waitForSelector("#title", { visible: true })
  // Wait some time so any field refresh doesn't mess up with our input
  await new Promise((r) => {
    setTimeout(r, 2000)
  })
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

module.exports = uploadToAnchor
