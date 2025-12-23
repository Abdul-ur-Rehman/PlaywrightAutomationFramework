import { expect } from "@playwright/test"

export class CartPage{

    constructor(page){

        this.page = page
        this.checkoutPageBtnLoc = page.locator("text=Checkout");

    }

    async verifyVisibilityOfCartedProduct(productName){

        await this.getProductLocator(productName).first().waitFor(); 
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName){

        return this.page.locator("h3:has-text('"+productName+"')")        
    }

    async navigateToCheckout(){

        await this.checkoutPageBtnLoc.click();
    }
}