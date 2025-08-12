module.exports = {
  login: {
    emailInput: 'input[type="email"]',
    passwordInput: 'input[type="password"]',
    loginButton: 'button:contains("Log in")',
    laterLink: 'a:contains("I\'ll do this later")',
    goToDashboardButton: 'button:contains("Go to dashboard")',
    joyrideCloseButton: '.react-joyride__tooltip [data-action="close"]'
  },

  connections: {
    menuConnections: '[data-testid="sub-menu-connections"]',
    dataplaneCopyButton: '.dataplane-url-copy-cta',
    javascriptSource: '.text-ellipsis:contains("JavaScript")',
    setupNode: '[data-node-key="Setup"]',
    writeKey: '[class*="sourceSetup_writeKey"]'
  },

  authGenerator: {
    usernameInput: 'input[name="username"]',
    generateButton: 'input[value="Generate Header"]',
    resultField: '#result'
  },

  webhook: {
    menuDestinations: '[data-testid="sub-menu-destinations"]',
    webhookConnection: '.ant-table-tbody .ant-table-cell:contains("Webhook Connection")',
    eventsNode: '[data-node-key="Events"]',
    deliveredCount: 'span:contains("Delivered")'
  }
};
