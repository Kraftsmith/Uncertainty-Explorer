// playwright.config.js
// Basic Playwright Test configuration
// Docs: https://playwright.dev/docs/test-configuration

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
  },
};

module.exports = config;
