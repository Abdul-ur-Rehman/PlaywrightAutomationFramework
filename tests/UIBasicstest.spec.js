import {test, expect} from '@playwright/test'
import { execPath } from 'node:process'

test('UI Controls', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const userName = page.locator('#username')
    const password = page.locator("[name='password']")
    const signInBtn = page.locator("[id='signInBtn']")
    const radio = page.locator(".customradio")
    const dropdown = page.locator("select.form-control")
    const documentLink = page.locator("[href*='documents-request']")



    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await radio.last().click()
    console.log(await radio.last().isChecked())
    await expect(radio.last()).toBeChecked()

    await page.locator("#okayBtn").click()
    await dropdown.selectOption("consult")

    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()


    await expect(documentLink).toHaveAttribute("class", "blinkingText")

    await documentLink.click()

    await page.pause()


})


test ("Child window handling",  async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage() 
    const userName = page.locator('#username')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    
    const documentLink = page.locator("[href*='documents-request']")

    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
  
    ])

    const emailContent = await newPage.locator(".red").textContent()
    console.log(emailContent)

    const emailTextArray = emailContent.split("@")
    const domain = emailTextArray[1].split(" ")[0]
    const userNameText = emailTextArray[0].split(" ")
    const email = userNameText[userNameText.length-1] + "@" + domain
    console.log(email)

    await userName.fill(email)

    await page.pause()
 

})

test('Page Playwright Test', async ({page}) => {

    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title());

    const userName = page.locator('#username')
    const password = page.locator("[name='password']")
    const signInBtn = page.locator("[id='signInBtn']")
    const cardTitles = page.locator(".card-body a") 

    await page.locator('#username').fill("abdulurrehman")
    await page.locator("[name='password']").fill('abdulurrehman')
    await page.locator("[id='signInBtn']").click()
    let errorMessage = await page.locator("[style*='block']").textContent()
    console.log(errorMessage)
    await expect(page.locator("[style*='block']")).toContainText("Incorrect")

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");

    await Promise.all(
        [
            page.waitForNavigation(),
             signInBtn.click()
            
        ]
    )


    // console.log(await cardTitles.nth(2).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
    expect(allTitles).toContain("iphone X")
    
})  