import { expect } from "@playwright/test"

export class ThankYouPage{

    constructor(page){

        this.page = page
        this.thankYouTextLoc = page.locator(".hero-primary")
        this.oidThankyouPageLoc = page.locator(".em-spacer-1 .ng-star-inserted")
        this.myOrdersBtnLoc = page.locator("button[routerlink*='/myorders']")
    }

    async verifyOrderPlacement(){

        await expect(this.thankYouTextLoc).toHaveText(" Thankyou for the order. ")
    }

    async getOrderIdOnThankyouPage(){

        const orderID = await this.oidThankyouPageLoc.first().textContent()
        return orderID
    }

    async navigateToMyOrdersPage(){

        await this.myOrdersBtnLoc.click()
    }
}