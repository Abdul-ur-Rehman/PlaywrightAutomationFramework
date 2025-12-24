import { test, expect } from "@playwright/test";
import { POManager } from "../pages/POManager";
import dataset from "../utils/placeorderTestData.json"


for (const data of dataset) {


  test(`Client App Login for ${data.productName}`, async ({ page }) => {

  const poManger = new POManager(page)

  const loginPage =  poManger.getLoginPage()
  await loginPage.goTo()
  await loginPage.validLogin(data.email, data.password)
  await page.waitForLoadState("networkidle");


  const dashboard = poManger.getDashboard()

  await dashboard.searchProductAddToCart(data.productName)

  await dashboard.navigateToCart()

  const cartPage = poManger.getCartPage()

  await cartPage.verifyVisibilityOfCartedProduct(data.productName)

  await cartPage.navigateToCheckout()

  const checkoutPage = poManger.getCheckoutPage()

  await checkoutPage.enterCVV(data.cvv)
  await checkoutPage.enterNameOnCard(data.name)

  await checkoutPage.verifyEmail(data.email)

  await checkoutPage.selectCountry(data.countryName)
  await checkoutPage.placeOrder()

  const thankYouPage = poManger.getThankyouPage()

  await thankYouPage.verifyOrderPlacement()

  const orderID = await thankYouPage.getOrderIdOnThankyouPage()
  console.log(orderID)

  await thankYouPage.navigateToMyOrdersPage()

  const myOrdersPage = poManger.getMyOrdersPage()

  await myOrdersPage.navigateToOrderDetailsPage(orderID)

  const orderDetailsPage = poManger.getOrderDetailsPage()

  await orderDetailsPage.verfiyOrderDetailsPageOrderId(orderID)

});
}
