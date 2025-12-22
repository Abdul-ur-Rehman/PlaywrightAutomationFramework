import { test, expect, request } from "@playwright/test";
import { ApiUtils } from "./utils/ApiUtils";

// variables
const loginPayLoad = {
  userEmail: "abdurrehman@dummy.com",
  userPassword: "Dummy@123",
};
let response;   
const orderPayLoad = {
  orders: [
    {
      country: "Pakistan",
      productOrderedId: "68a961719320a140fe1ca57c",
    },
  ],
};

// before execution
test.beforeAll(async () => {

  const apiContext = await request.newContext();

  const apiUtils = new ApiUtils(apiContext, loginPayLoad)
  response = await apiUtils.createOrder(orderPayLoad)
});

// test case
test("Place an order", async ({ page }) => {

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");


  await page.locator("button[routerlink*='/myorders']").click();

  // myorders page

  const orderRows = await page.locator("tbody tr");
  await page.locator("tbody").waitFor();
  const allOrdersCount = await orderRows.count();
  console.log(allOrdersCount);

  for (let i = 0; i < allOrdersCount; i++) {
    const oid = await orderRows.nth(i).locator("th").textContent();

    if (response.orderID.includes(oid)) {
      console.log(oid);
      orderRows.nth(i).locator("button").first().click();
      break;
    }
  }

  const oidDetailsPage = await page.locator(".col-text").textContent();

  await expect(response.orderID  .includes(oidDetailsPage)).toBeTruthy();

  //await page.pause();
});
