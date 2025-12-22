import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Dashboard } from "../pages/Dashboard";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ThankYouPage } from "../pages/ThankYouPage";
import { MyOrdersPage } from "../pages/MyOrdersPage";



test.only("Browser Context Playwright Test", async ({ page }) => {

  const email = "abdurrehman@dummy.com";
  const name = "Abdul-ur-Rehman"
  const cvv = "123"
  const password = "Dummy@123"
  const productName = "ADIDAS ORIGINAL";

  const loginPage =  new LoginPage(page);
  await loginPage.goTo()
  await loginPage.validLogin(email, password)
  await page.waitForLoadState("networkidle");


  const dashboard = new Dashboard(page)

  await dashboard.searchProductAddToCart(productName)

  await dashboard.navigateToCart()

  const cartPage = new CartPage(page)  

  const prodVisibility = await cartPage.verifyVisibilityOfCartedProduct()
  console.log(prodVisibility)
  expect(prodVisibility).toBeTruthy();

  await cartPage.navigateToCheckout()

  const checkoutPage = new CheckoutPage(page)

  await checkoutPage.enterCVV(cvv)
  await checkoutPage.enterNameOnCard(name)

  await checkoutPage.verifyEmail(email)

  await checkoutPage.selectCountry("Pakistan")
  await checkoutPage.placeOrder()

  const thankYouPage = new ThankYouPage(page)

  await thankYouPage.verifyOrderPlacement()

  const orderID = await thankYouPage.getOrderIdOnThankyouPage()
  console.log(orderID)

  await thankYouPage.navigateToMyOrdersPage()

  const myOrdersPage = new MyOrdersPage(page)

  await myOrdersPage.navigateToOrderDetailsPage()




const oidDetailsPage = await page.locator(".col-text").textContent()

await expect(orderID.includes(oidDetailsPage)).toBeTruthy();



//await page.pause()
});
