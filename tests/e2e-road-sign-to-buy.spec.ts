import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5000/');
  await page.goto('http://localhost:5000/signin');
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').fill('andrey');
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('12345');
  await page.getByPlaceholder('Enter your password').press('Tab');
  await page.getByLabel('Sign in').press('Enter');
  await page.locator('div:nth-child(2) > div > .shadow-2 > .p-button').click();
  await page.locator('div:nth-child(4) > div > .shadow-2 > .p-button').click();
  await page.getByRole('link', { name: ' Cart [2]' }).click();
  await page.getByLabel('Сheckout').click();
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('Andrey');
  await page.getByPlaceholder('Name', { exact: true }).press('Tab');
  await page.getByPlaceholder('Surname').fill('Shevelev');
  await page.getByPlaceholder('City / Town').click();
  await page.getByPlaceholder('City / Town').fill('Novosibirsk');
  await page.getByPlaceholder('Street').click();
  await page.getByPlaceholder('Street').fill('Lenina');
  await page.getByPlaceholder('House').click();
  await page.getByPlaceholder('House').fill('1');
  await page.getByPlaceholder('Card Owner').click();
  await page.getByPlaceholder('Card Owner').fill('ANDREY SHEVELEV');
  await page.getByPlaceholder('Card Number').click();
  await page.getByPlaceholder('Card Number').fill('1234567812345678');
  await page.locator('#agree-with-rules-o1 div').nth(1).click();
  await page.getByLabel('Send order').click();
});
