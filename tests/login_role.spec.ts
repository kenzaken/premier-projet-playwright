import { test, expect } from '@playwright/test'

//hoock before
test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
})
//hoock after
test.afterEach(async ({ page }) => {
    // pour supprimer les cookies de la session ou bien les info de la session 
    await page.context().clearCookies();
    // pour supprimer le local storage
    await page.evaluate(() => localStorage.clear())
})

test('pour tester le getByRole', async ({ page }) => {
    //await page.goto("https://www.saucedemo.com/");
    // pour le Username
    await page.getByRole("textbox", { name: "Username" }).fill("standard_user")
    //pour le password
    await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce")
    // le login
    await page.getByRole("button", { name: "Login" }).click()
    //assertion 
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})

test('pour tester le getByRole pour un login invalid', async ({ page }) => {
    //await page.goto("https://www.saucedemo.com/");
    // pour le Username
    await page.getByRole("textbox", { name: "Username" }).fill("anis")
    //pour le password
    await page.getByRole("textbox", { name: "Password" }).fill("123456789")
    // le login
    await page.getByRole("button", { name: "Login" }).click()

    //assertion
    //await expect(page.locator("[data-test='error']")).toContainText("Epic sadface: Username and password do not match any user in this service")
    await expect(page.getByRole("heading", { name: "Epic sadface: Username and password do not match any user in this service" })).toBeVisible()
})


