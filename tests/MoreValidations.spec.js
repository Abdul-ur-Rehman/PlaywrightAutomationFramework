import {test} from '@playwright/test'

test("Popup Validations ", async ({page}) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com")
    // await page.goBack()
    // await page.goForward()

    //await page.pause()
    await page.locator("#confirmbtn").click()
    await page.on("dialog", dialog => dialog.accept())

    await page.locator("#mousehover").hover()

    const framePage = await page.frameLocator("iframe-name")
    // await framePage.locator("a[href*='all-access-subscription']").first().click()
    // console.log(await framePage.locator(".text-2xl.font-bold.text-foreground").first().textContent())

    

})