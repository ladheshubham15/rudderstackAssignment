import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import locators from '../locators/helperLocators'


Given(
  'I am logged into the RudderStack dashboard with {string} and {string}',
  (emailKey, passwordKey) => {
    cy.visit('/login')
    cy.get(locators.login.emailInput).type(Cypress.env(emailKey))
    cy.get(locators.login.passwordInput).type(Cypress.env(passwordKey), { log: false })
    cy.contains('button', 'Log in').click()
    cy.contains('a', "I'll do this later").click()
    cy.contains('button', "Go to dashboard").click()
    cy.get(locators.login.joyrideCloseButton).click()
  }
)

When('I go to the Connections page', () => {
  cy.get(locators.connections.menuConnections).click()
})

When('I read and save the data plane URL and the HTTP source write key', () => {
  cy.get(locators.connections.dataplaneCopyButton)
    .prev()
    .invoke('text')
    .then((url) => {
      Cypress.env('DATA_PLANE_URL', url.trim())
    })

  cy.contains('.text-ellipsis', 'JavaScript').click()
  cy.get(locators.connections.setupNode).click()
  cy.get(locators.connections.writeKey)
    .invoke('text')
    .then((key) => {
      const cleaned = key.replace(/Write key/gi, '').trim()
      Cypress.env('WRITE_KEY', cleaned)
    })
})

When('I POST a sample event to the data plane using the write key', () => {
  const dp = Cypress.env('DATA_PLANE_URL')
  const key1 = Cypress.env('WRITE_KEY')

  const authLocators = {
    usernameInput: 'input[name="username"]',
    generateButton: 'input[value="Generate Header"]',
    resultField: '#result'
  }

  cy.origin(
    'https://www.blitter.se/utils/basic-authentication-header-generator/',
    { args: { dp, key1, authLocators } },
    ({ dp, key1, authLocators }) => {
      cy.visit('/')
      cy.get(authLocators.usernameInput).type(key1)
      cy.get(authLocators.generateButton).click()
      cy.get(authLocators.resultField).invoke('text').then(text => {
        const authKEY = text.replace(/^Authorization:\s*Basic\s*/i, 'Basic ')
        cy.request({
          method: 'POST',
          url: `${dp}/v1/identify`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": authKEY
          },
          body: {
            "userId": "identified user id",
            "anonymousId": "anon-id-new",
            "context": {
              "traits": { "trait1": "new-val" },
              "ip": "14.5.67.21",
              "library": { "name": "http" }
            },
            "timestamp": "2020-02-02T00:23:09.544Z"
          },
          failOnStatusCode: false
        }).then((resp) => {
          expect(resp.status).to.eq(200)
        })
      })
    }
  )
})

Then('the webhook destination should show at least 1 delivered event', () => {
  cy.wait(60000) //wait for data sync on events dashboard
  cy.visit('https://app.rudderstack.com/')
  cy.get(locators.webhook.menuDestinations).click()
  cy.get(locators.webhook.webhookConnection).click()
  cy.get(locators.webhook.eventsNode).click()
  cy.contains('span', 'Delivered').next().invoke('text').then((t) => {
    expect(parseInt(t, 10)).to.be.greaterThan(0)
  })
})


