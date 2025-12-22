import { test, expect } from "@playwright/test";

test("Browser Context Playwright Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // const firstName = page.locator("#firstName")
  // const lastName = page.locator("#lastName")
  const email = "abdurrehman@dummy.com";
  const productName = "ADIDAS ORIGINAL";
  const productCards = page.locator(".card-body");
  const emailLoc = page.locator("#userEmail");
  // const mobile = page.locator("userMobile")
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("#login");

  // await page.locator(".login-wrapper-footer-text").click()
  // await firstName.fill("Abdur")
  // await lastName.fill("Rehman")
  await emailLoc.fill("abdurrehman@dummy.com");
  // await mobile.fill("090078601")
  await password.fill("Dummy@123");
  await loginBtn.click();

  await page.waitForLoadState("networkidle");

  const productsCount = await productCards.count();
  console.log(productsCount);

  for (let i = 0; i < productsCount; i++) {
    const prodName = await productCards.nth(i).locator("b").textContent();
    if (prodName === productName) {
      await productCards.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*=cart]").click();
  await page.locator("h3:has-text('ADIDAS ORIGINAL')").first().waitFor();
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator(".form__cc [type='text']").nth(1).fill("123");
  await page.locator(".form__cc [type='text']").nth(2).fill("Abdul-ur-Rehman");

  await expect(page.locator(".user__name label[type='text']")).toHaveText(email);

  await page.locator("[placeholder*='Country']").pressSequentially("Pa");

  const optionsSection = await page.locator(".ta-results");
  await optionsSection.waitFor();

  const optionsCount = await optionsSection.locator("button").count();
  console.log(optionsCount);

  for (let i=0; i<optionsCount; i++){

    const optionText = await optionsSection.locator("button").nth(i).textContent()

    if(optionText.trim() === "Pakistan"){
        optionsSection.locator("button").nth(i).click()
        break
  }
}

await page.locator("text=Place Order").click()

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
console.log(orderID)

await page.locator("button[routerlink*='/myorders']").click()

const orderRows = await page.locator("tbody tr")
await page.locator("tbody").waitFor();
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

const oidDetailsPage = await page.locator(".col-text").textContent()

await expect(orderID.includes(oidDetailsPage)).toBeTruthy();



//await page.pause()
});
