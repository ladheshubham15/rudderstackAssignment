import RudderStack from '../locators/helperLocators'
const helperLoc = new RudderStack()
class rudderstackHelperFunctions {
    loginAndSkip2FA(email, password) {
        cy.visit('/login')
        helperLoc.getEmailInput().type(Cypress.env(email))
        helperLoc.getPasswordInput().type(Cypress.env(password), { log: false })
        helperLoc.getLoginButton().click()
        helperLoc.getSkipSetupLink().click()
        helperLoc.getGoToDashboardButton().click()
    }

    storeDataPlainUrl() {
        helperLoc.getDataPlaneUrlCopy()
            .prev()
            .invoke('text')
            .then((url) => {
                Cypress.env('DATA_PLANE_URL', url.trim())
            })
    }

    storeWriteKey() {
        helperLoc.getSetupNode().click()
        helperLoc.getWriteKeyElement()
            .invoke('text')
            .then((key) => {
                const cleaned = key.replace(/Write key/gi, '').trim()
                Cypress.env('WRITE_KEY', cleaned)
            })
    }

    verifyIfEventsAreAvailableAtDestination(destination) {
        cy.visit('/')
        helperLoc.getMenuDestinations().click()
        helperLoc.getDestinationConnectionRow(destination).click()
        helperLoc.getEventsNode().click()
        helperLoc.getDeliveredCountLabel().next().invoke('text').then((t) => {
            expect(parseInt(t, 10)).to.be.greaterThan(0)
        })
    }

    triggerIdentityEvent(data) {
        const dp = Cypress.env('DATA_PLANE_URL')
        const key1 = Cypress.env('WRITE_KEY')

        const authLocators = {
            usernameInput: 'input[name="username"]',
            generateButton: 'input[value="Generate Header"]',
            resultField: '#result'
        }
        cy.origin(
            'https://www.blitter.se/utils/basic-authentication-header-generator/',
            { args: { dp, key1, authLocators, data } },
            ({ dp, key1, authLocators, data, }) => {
                cy.visit('/')
                cy.get(authLocators.usernameInput).type(key1)
                cy.get(authLocators.generateButton).click()
                cy.get(authLocators.resultField).invoke('text').then(text => {
                    const authKey = text.replace(/^Authorization:\s*Basic\s*/i, 'Basic ')
                    cy.request({
                        method: 'POST',
                        url: `${dp}/v1/identify`,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": authKey
                        },
                        body: data,
                        failOnStatusCode: false
                    }).then((resp) => {
                        expect(resp.status).to.eq(200)
                    })
                })
            })
    }

}
export default rudderstackHelperFunctions