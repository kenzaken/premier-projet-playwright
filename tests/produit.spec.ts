import{test,expect} from '@playwright/test'


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    // pour le Username
    await page.getByRole("textbox", { name: "Username" }).fill("standard_user")
    //pour le password
    await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce")
    // le login
    await page.getByRole("button", { name: "Login" }).click()
})
//hoock after
test.afterEach(async ({ page }) => {
    // pour supprimer les cookies de la session ou bien les info de la session 
    await page.context().clearCookies();
    // pour supprimer le local storage
    await page.evaluate(() => localStorage.clear())
})

test('description : mettre un produit dans le panier',async ({ page }) => {
    //await page.goto("https://www.saucedemo.com/");
    
    //assertion 
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    // cliquer sur Add to cart
    //await page.getByRole("button", { name:"add-to-cart-sauce-labs-backpack" }).click();
     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //assertion 
     await expect(page.getByRole("button", { name: "Remove" })).toBeVisible;
    //assertion 
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");
    //pour le panier
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

})