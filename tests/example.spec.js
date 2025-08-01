// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('homepage has expected title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Uncertainty|Cynefin|Stacey|Summary/i);
});
