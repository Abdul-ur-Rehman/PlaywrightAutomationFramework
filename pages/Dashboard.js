export class Dashboard {
  constructor(page) {
    this.page = page;
    this.productCardsLoc = page.locator(".card-body");
    this.CartLoc = page.locator("[routerlink*=cart]");
  }

  async searchProductAddToCart(productName) {


    const productsCount = await this.productCardsLoc.count();
    console.log(productsCount);

    for (let i = 0; i < productsCount; i++) {
      const prodName = await this.productCardsLoc.nth(i).locator("b").textContent();
      if (prodName === productName) {
        await this.productCardsLoc.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }

  }

  async navigateToCart(){

    await this.CartLoc.click();

  }
}
