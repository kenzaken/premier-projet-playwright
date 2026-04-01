import { test, expect } from '@playwright/test'
import { produitpom } from '../pages/produitpom.page'
import { loginpom } from '../pages/loginpom.page'

let pp: produitpom
let lp: loginpom
test.beforeEach("setup", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    // 
    lp = new loginpom(page)
    pp = new produitpom(page);
    /*await lp.saisirUsername("standard_user")
    await lp.saisirpassword("secret_sauce")
    await lp.clickLogin()*/
    //soliciter la methode loginToApp pour l'action de l'authentification
    await lp.logintoApp("standard_user", "secret_sauce")

});
test.afterEach(async ({ page }) => {
    // pour supprimer les cookies de la session ou bien les info de la session 
    await page.context().clearCookies();
    // pour supprimer le local storage
    await page.evaluate(() => localStorage.clear())
})

test("description: mettre un produit dans le panier  avec le fechier pom", async ({ page }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await pp.addproduct()
    await expect(pp.produremove()).toBeVisible()
    await expect(pp.shopcart()).toContainText("1")
    await pp.shopcartlink()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
})


