export class MyOrdersPage{

    constructor(page){

        this.page = page
        this.ordersTable = page.locator("tbody")
        this.ordersTableRowLoc = page.locator("tbody tr")
    }

    async navigateToOrderDetailsPage(){
        
        const orderRows = await this.ordersTableRowLoc
        await this.ordersTable.waitFor();     
        const allOrdersCount = await orderRows.count()
        console.log(allOrdersCount)

        for (let i=0; i<allOrdersCount; i++){
            const oid = await orderRows.nth(i).locator("th").textContent()
            
            if (orderID.includes(oid)){
                console.log(oid)
                orderRows.nth(i).locator("button").first().click()
                break
            }
        }
    }

}