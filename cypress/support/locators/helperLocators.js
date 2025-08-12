class RudderStackPage {

  // Login page
  getEmailInput() {
    return cy.get('input[type="email"]');
  }

  getPasswordInput() {
    return cy.get('input[type="password"]');
  }

  getLoginButton() {
    return cy.contains('button', 'Log in');
  }

  getSkipSetupLink() {
    return cy.contains('a', "I'll do this later");
  }

  getGoToDashboardButton() {
    return cy.contains('button', "Go to dashboard");
  }

  getCloseTooltipButton() {
    return cy.get('.react-joyride__tooltip [data-action="close"]');
  }

  // Connections page
  getMenuConnections() {
    return cy.get('[data-testid="sub-menu-connections"]');
  }

  // Data Plane URL & Write Key
  getDataPlaneUrlCopy() {
    return cy.get('.dataplane-url-copy-cta')
  }

  getJavascriptSource() {
    return cy.contains('.text-ellipsis', 'JavaScript');
  }

  getSetupNode() {
    return cy.get('[data-node-key="Setup"]');
  }

  getWriteKeyElement() {
    return cy.get('[class*="sourceSetup_writeKey"]');
  }

  // Blitter Basic Auth Page
  getUsernameInput() {
    return cy.get('input[name="username"]');
  }

  getGenerateHeaderButton() {
    return cy.get('input[value="Generate Header"]');
  }

  getResultAuthKey() {
    return cy.get('#result');
  }

  // Destinations & Events
  getMenuDestinations() {
    return cy.get('[data-testid="sub-menu-destinations"]');
  }

  getDestinationConnectionRow(destination) {
    return cy.contains('.ant-table-tbody .ant-table-cell', destination)
  }

  getEventsNode() {
    return cy.get('[data-node-key="Events"]');
  }

  getDeliveredCountLabel() {
    return cy.contains('span', 'Delivered')
  }

  getSourceTile(source){
    return cy.contains('.text-ellipsis', source)
  }
}
export default RudderStackPage