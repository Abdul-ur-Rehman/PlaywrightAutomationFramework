import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ThankYouPage } from "../pages/ThankYouPage";
import { MyOrdersPage } from "../pages/MyOrdersPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage";
import { POManager } from "../pages/POManager";



test("Browser Context Playwright Test", async ({ page }) => {

  const poManger = new POManager(page)

  const email = "abdurrehman@dummy.com";
  const name = "Abdul-ur-Rehman"
  const cvv = "123"
  const password = "Dummy@123"
  const productName = "ADIDAS ORIGINAL";
  const countryName = "Pakistan"

  const loginPage =  poManger.getLoginPage()
  await loginPage.goTo()
  await loginPage.validLogin(email, password)
  await page.waitForLoadState("networkidle");


  const dashboard = poManger.getDashboard()

  await dashboard.searchProductAddToCart(productName)

  await dashboard.navigateToCart()

  const cartPage = poManger.getCartPage()

  await cartPage.verifyVisibilityOfCartedProduct(productName)

  await cartPage.navigateToCheckout()

  const checkoutPage = poManger.getCheckoutPage()

  await checkoutPage.enterCVV(cvv)
  await checkoutPage.enterNameOnCard(name)

  await checkoutPage.verifyEmail(email)

  await checkoutPage.selectCountry(countryName)
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
