import { expect } from "@playwright/test"

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cvvLoc = page.locator(".form__cc [type='text']");
    this.nameOnCardLoc = page.locator(".form__cc [type='text']");
    this.verifyEmailLoc = page.locator(".user__name label[type='text']");
    this.countryLoc = page.locator("[placeholder*='Country']");
    this.countriesSectionLoc = page.locator(".ta-results");
    this.placeOrderBtnLoc = page.locator("text=Place Order");
  }

  async enterCVV(cvv) {
    await this.cvvLoc.nth(1).fill(cvv);
  }


  async enterNameOnCard(nameOnCard) {
    await this.nameOnCardLoc.nth(2).fill(nameOnCard);
  }

  async verifyEmail(email) {
    await expect(this.verifyEmailLoc).toHaveText(email);
  }

  async selectCountry(country) {

    const countryInitials = country.substring(0, 3)
    console.log(countryInitials)
    await this.countryLoc.pressSequentially("Pa");

    const optionsSection = await this.countriesSectionLoc;
    await optionsSection.waitFor();

    const optionsCount = await optionsSection.locator("button").count();
    console.log(optionsCount);

    for (let i = 0; i < optionsCount; i++) {
      const optionText = await optionsSection.locator("button").nth(i).textContent();

      if (optionText.trim() === country) {
        optionsSection.locator("button").nth(i).click();
        break;
      }
    }
  }

  async placeOrder(){

      await this.placeOrderBtnLoc.click()

  }
}
