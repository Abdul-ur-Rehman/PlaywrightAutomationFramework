import { expect } from "@playwright/test"

export class OrderDetailsPage{

    constructor(page){

        this.page = page
        this.oidOnOrderDetailsPageLoc = page.locator(".col-text")
    }

    async verfiyOrderDetailsPageOrderId(orderID){

        const oidDetailsPage = await this.oidOnOrderDetailsPageLoc.textContent()
        await expect(orderID.includes(oidDetailsPage)).toBeTruthy();
    }
}