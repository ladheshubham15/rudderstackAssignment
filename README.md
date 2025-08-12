# rudderstackAssignment
# **RudderStack Automation Framework**

This repository contains an **end-to-end (E2E) automation framework** built with:

- [Cypress](https://www.cypress.io/) for browser automation  
- [Cucumber](https://cucumber.io/) for BDD-style tests  
- [GitHub Actions](https://docs.github.com/en/actions) for CI/CD execution  
- `.env` configuration for multi-environment support (**dev**, **qa**, **prod**)

---

## **📂 Project Structure**

```
RUDDERSTACKASSIGNMENT
│
├── .github/workflows/         # GitHub Actions workflow definitions
│   └── cypress-tests.yml      # CI/CD pipeline for Cypress tests
│
├── cypress/
│   ├── downloads/             # Cypress downloads folder
│   ├── e2e/                    # Feature files for Cucumber
│   │   └── rudderstack.feature
│   ├── fixtures/               # Static test data & payloads
│   │   └── sampleEvent.json
│   ├── screenshots/            # Screenshots captured during tests
│   ├── support/                # Framework support code
│   │   ├── locators/            # Page element locators
│   │   │   └── helperLocators.js
│   │   ├── step_definitions/    # Step definition files
│   │   │   └── rudderstack.steps.js
│   │   ├── supportFunctions/    # Reusable helper functions
│   │   │   └── helperFunctions.js
│   │   ├── commands.js          # Custom Cypress commands
│   │   └── e2e.js               # Cypress support file
│
├── .env.dev                    # Environment variables for Dev
├── .env.qa                     # Environment variables for QA
├── .env.prod                   # Environment variables for Prod
├── .gitignore                  # Git ignore rules
├── cypress.config.js           # Cypress configuration
├── package.json                # NPM dependencies and scripts
├── package-lock.json
└── README.md                   # Project documentation
```

---

## **⚙️ Setup Instructions**

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

### **2️⃣ Clone the Repository**
```bash
git clone <your-repo-url>
cd RUDDERSTACKASSIGNMENT
```

---

### **3️⃣ Install Dependencies**
```bash
npm ci
```

---

### **4️⃣ Configure Environment Files**
There are three `.env` files for **dev**, **qa**, and **prod** environments:
```
.env.dev
.env.qa
.env.prod
```

Each `.env` file should contain:
```
RUDDER_EMAIL=<your-email>
RUDDER_PASSWORD=<your-password>
BASEURL=<your-app-base-url>
```

---

## **▶️ Running Tests Locally**

### **Open Cypress in Interactive Mode**
```bash
npm run cypress:open:dev
```

### **Run Cypress in Headless Mode**
```bash
npm run cypress:run:dev
```

Replace `dev` with `qa` or `prod` for other environments.

---

## **📜 NPM Scripts**

In **`package.json`**:
```json
"scripts": {
  "cypress:open:dev": "cypress open --env configFile=dev",
  "cypress:open:qa": "cypress open --env configFile=qa",
  "cypress:open:prod": "cypress open --env configFile=prod",
  "cypress:run:dev": "cypress run --env configFile=dev",
  "cypress:run:qa": "cypress run --env configFile=qa",
  "cypress:run:prod": "cypress run --env configFile=prod"
}
```

---

## **🧩 Framework Components**

- **Feature Files (`.feature`)**  
  Located in `cypress/e2e/`, these define test scenarios in Gherkin syntax.

- **Step Definitions**  
  Located in `cypress/support/step_definitions/`, implement the steps defined in `.feature` files.

- **Locators**  
  Stored in `cypress/support/locators/`, containing reusable selectors in a class/object format.

- **Helper Functions**  
  Stored in `cypress/support/supportFunctions/`, containing reusable Cypress commands and business logic.

- **Fixtures**  
  Stored in `cypress/fixtures/`, containing static test data like JSON payloads.

- **Environment Files**  
  `.env.dev`, `.env.qa`, `.env.prod` store credentials and URLs for each environment.

---

## **🚀 GitHub Actions CI/CD**

The GitHub Actions workflow runs **Cypress tests automatically on every push to `main`**.

**Workflow File:** `.github/workflows/cypress-tests.yml`
```yaml
name: Cypress Tests run on Deploy from Main, on dev environment

on:
  push:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Copy dev env file
        run: cp .env.dev .env  

      - name: Run Cypress tests (headless)
        uses: cypress-io/github-action@v6
        with:
          command: npm run cypress:run:dev
```

---

## **📌 Notes**
- All credentials and sensitive data should be managed via **`.env` files** locally and **GitHub Secrets** in CI/CD.
- Fixtures allow storing reusable payloads like `sampleEvent.json` for API requests.
- Locators are stored separately for maintainability.
- The framework supports multiple environments without code changes.
- For Assignment Purpose Github actions are only executing for dev env.
