import {test,expect} from '@playwright/test'

test("login valid",{tag:"@regression"},async ({page}) =>
{
await page.goto("https://www.saucedemo.com/");
//pour cibler le user name
await page.locator("#user-name").fill("standard_user");
// pour cibler password
await page.locator("#password").fill("secret_sauce");
//pour cibler le login
await page.locator("#login-button").click();
//assertion  pour verifier  le resultat attendu
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})


test("login non valid",{tag:["@regression","@smoke","@invalid"]},async ({page}) =>
{
await page.goto("https://www.saucedemo.com/");
//pour cibler le user name
await page.locator("#user-name").fill("anis");
// pour cibler password
await page.locator("#password").fill("AB123");
//pour cibler le login
await page.locator("#login-button").click();
//assertion  pour verifier  le message d'erreur

await expect(page.locator("[data-test='error']")).toContainText("Epic sadface: Username and password do not match any user in this service")

})