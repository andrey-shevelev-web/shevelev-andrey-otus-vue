import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5000/');
  await page.goto('http://localhost:5000/signin');
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').fill('andrey');
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('123');
  await page.getByLabel('Sign in').click();
  await page.waitForNavigation();
  await expect(page.getByText('Products').nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart' }).nth(3).click();
  await page.getByRole('link', { name: ' Cart [1]' }).click();
  await page.getByRole('button', { name: '' }).click();
});
