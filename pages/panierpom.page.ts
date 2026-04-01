import { Page } from '@playwright/test'

export class panierpom {
    readonly page: Page

    constructor(p: Page) {
        this.page = p
    }

    Elements = {
        assertproduct: () => this.page.locator('[data-test="inventory-item-name"]'),
        Checkoutbutton: () => this.page.locator('[data-test="checkout"]'),
        remove: () => this.page.locator('[data-test="remove-sauce-labs-backpack"]'),
        shoppingbutton: () => this.page.locator('[data-test="continue-shopping"]'),
    }



    productisvisible() {
        return this.Elements.assertproduct()
    }

    async checkout() {
        await this.Elements.Checkoutbutton().click()
    }

    async removebutton() {
        await this.Elements.remove().click()
    }

    async shopbutton() {
        await this.Elements.shoppingbutton().click()
    }
}