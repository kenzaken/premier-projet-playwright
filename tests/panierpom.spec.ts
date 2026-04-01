import { test, expect } from '@playwright/test'
import { loginpom } from '../pages/loginpom.page'
import { produitpom } from '../pages/produitpom.page'
import { panierpom } from '../pages/panierpom.page'


let lp: loginpom
let pp: produitpom
let pa: panierpom

test.beforeEach("third step", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    lp = new loginpom(page)
    pp = new produitpom(page)
    pa = new panierpom(page)
    await lp.logintoApp("standard_user", "secret_sauce")
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await pp.addproduct()
    await expect(pp.produremove()).toBeVisible()
    await expect(pp.shopcart()).toContainText("1")
    await pp.shopcartlink()
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")




})
test("verifier le panier des produit avec la notion du pom", async ({ page }) => {

    // Vérifier produit présent
    await expect(pa.productisvisible()).toContainText("Sauce Labs Backpack")

    // Vérifier bouton checkout
    await expect(pa.Elements.Checkoutbutton()).toBeVisible()

    // Tester remove
    await pa.removebutton()

    // Revenir ajouter produit (sinon checkout impossible)
    await pa.shopbutton()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    await pp.addproduct()
    await pp.shopcartlink()

    // Vérifier qu'on est de nouveau dans le panier
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

    // Checkout maintenant OK
    await pa.checkout()
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")

})

