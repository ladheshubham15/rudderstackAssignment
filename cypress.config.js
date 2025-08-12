const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const dotenv = require('dotenv');
const path = require('path')
let appPath = 'app'

async function setupNodeEvents(on, config) {
  const envName = config.env.configFile || 'dev';
  if (envName == 'dev') {
    appPath = 'app'
  } else {
    appPath = envName
  }

  const envFilePath = path.resolve(process.cwd(), `.env.${envName}`);

  console.log(`Loading env file: ${envFilePath}`);
  const result = dotenv.config({ path: envFilePath });

  if (result.error) {
    throw result.error;
  }

  config.env = { ...config.env, ...result.parsed };
  console.log('Loaded env vars:', result.parsed)
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );
  return config;
}

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000, // 30 seconds for all Cypress commands
    pageLoadTimeout: 60000,
    baseUrl: `https://${appPath}.rudderstack.com`,
    specPattern: 'cypress/e2e/**/*.feature',
    stepDefinitions: [
      'cypress/e2e/step_definitions/**/*.{js,ts}', // your current folder
      'cypress/support/step_definitions/**/*.{js,ts}'
    ],
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
  },
});
