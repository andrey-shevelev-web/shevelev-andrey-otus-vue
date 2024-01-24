import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5000/');
  await page.goto('http://localhost:5000/signin');
  await page.getByPlaceholder('Enter your username').click();
  await page.getByPlaceholder('Enter your username').fill('andrey');
  await page.getByPlaceholder('Enter your username').press('Tab');
  await page.getByPlaceholder('Enter your password').fill('12345');
  await page.getByLabel('Sign in').click();
  await page.getByTestId('add-to-cart').click();
  await page.getByPlaceholder('Input title').click();
  await page.getByPlaceholder('Input title').fill('111');
  await page.getByPlaceholder('Input category').click();
  await page.getByPlaceholder('Input category').fill('222');
  await page.getByPlaceholder('Input description').click();
  await page.getByPlaceholder('Input description').fill('3333');
  await page.getByPlaceholder('Input Price').click();
  await page.getByPlaceholder('Input Price').click();
  await page.getByPlaceholder('Input Price').press('ArrowLeft');
  await page.getByPlaceholder('Input Price').press('ArrowLeft');
  await page.getByPlaceholder('Input Price').press('ArrowLeft');
  await page.getByLabel('Add product').click();
});
