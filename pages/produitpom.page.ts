import { Page } from '@playwright/test'
export class produitpom {
    readonly page: Page;
    constructor(p: Page) {
        this.page = p
    }
    productelement = {
        addtocart: () => this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
        //une assertion avec getbyrole 
        removeproduct: () => this.page.getByRole("button", { name: "Remove" }),
        shopingcart: () => this.page.locator('[data-test="shopping-cart-badge"]'),
        shoppincartlink: () => this.page.locator('[data-test="shopping-cart-link"]')


    }
    // faire des mothodes pour que on puisse utilisée dans le fechier test
    async addproduct() {
        await this.productelement.addtocart().click()

    }
    // la c'est pas un text et on fait return qaund on veut returner  un text
    produremove() {
        return this.productelement.removeproduct()
    }
    shopcart() {
        return this.productelement.shopingcart()
    }
    async shopcartlink() {
        await this.productelement.shoppincartlink().click()
    }

}



