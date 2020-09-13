/// <reference types="cypress" />

const email = Cypress.env("ANCHOR_EMAIL")
const password = Cypress.env("ANCHOR_PASSWORD")
Cypress.config("responseTimeout", 200000)

context("Actions", () => {
  it("Upload Episode To Anchor.fm  ", () => {
    // Login
    cy.visit("https://anchor.fm/login")
    cy.get("#email").type(email)
    cy.get("#password").type(password)
    cy.get("button[type=submit]").click()
    cy.wait(5000)

    // Upload File
    cy.contains("New Episode", { timeout: 60000 }).click()
    cy.wait(5000)
    cy.get("input[type=file]").parent().attachFile(
      {
        filePath: "episode.m4a",
        mimeType: "audio/m4a",
        encoding: "base64",
      },
      {
        subjectType: "drag-n-drop",
        force: true,
      }
    )

    cy.wait(6000) // To Make sure Upload has been started

    cy.waitUntil(
      () =>
        cy
          .get("button")
          .contains("Save episode")
          .then(($el) => !$el.prop("disabled")),
      {
        errorMsg: "Upload issue",
        timeout: 3600000, // Max upload time is One hour
        interval: 5000,
      }
    )

    cy.wait(6000)

    cy.get("button").contains("Save episode").click()

    // Add Title and Description
    cy.wait(5000)
    cy.fixture("episode.json").then((episode) => {
      cy.get("#title", { timeout: 60000 }).type(episode.title)
      cy.get("button").contains("Switch to HTML").click()
      cy.get("textarea[name=description]").type(episode.description)
    })
    cy.wait(1000)

    // Save Episode As draft
    cy.contains("Save as a draft").click()
    cy.wait(4000)
  })
})
