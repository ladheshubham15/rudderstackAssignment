import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import RudderStackPage from '../locators/helperLocators'
import rudderstackHelperFunctions from '../supportFunctions/helperFunctions'

const uiHelper = new rudderstackHelperFunctions()
const helperLoc = new RudderStackPage()
const waitTimeOutForEventDataSync = 60000


Given(
  'I am logged into the RudderStack dashboard with {string} and {string}',
  (emailKey, passwordKey) => {
    uiHelper.loginAndSkip2FA(emailKey, passwordKey)
    helperLoc.getCloseTooltipButton().click()
  }
)

When('I go to the Connections page', () => {
  helperLoc.getMenuConnections().click()
})

When('I read and save the data plane URL and the HTTP {string} source write key', (source) => {
  uiHelper.storeDataPlainUrl()
  helperLoc.getSourceTile(source).click()
  uiHelper.storeWriteKey()
})

When('I POST a sample event to the data plane using the write key', () => {
  cy.fixture('sampleEvent').then((data) => {
    uiHelper.triggerIdentityEvent(data)
  })
})


Then('the {string} destination should show at least 1 delivered event', (destination) => {
  cy.wait(waitTimeOutForEventDataSync) //wait for data sync on events dashboard
  uiHelper.verifyIfEventsAreAvailableAtDestination(destination)
})


