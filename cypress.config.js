const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const dotenv = require('dotenv')
const path = require('path')

async function setupNodeEvents(on, config) {
  const envName = config.env.configFile || 'dev'
  const envFilePath = path.resolve(process.cwd(), `.env.${envName}`)

  console.log(`Loading env file: ${envFilePath}`)
  const result = dotenv.config({ path: envFilePath })

  if (result.error) {
    throw result.error
  }

  config.env = { ...config.env, ...result.parsed }

  if (config.env.BASE_URL) {
    config.baseUrl = config.env.BASE_URL
  }

  console.log('Loaded env vars:', result.parsed)

  await addCucumberPreprocessorPlugin(on, config)
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  )
  return config
}

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.feature',
    stepDefinitions: [
      'cypress/e2e/step_definitions/**/*.{js,ts}',
      'cypress/support/step_definitions/**/*.{js,ts}'
    ],
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
  },
})
