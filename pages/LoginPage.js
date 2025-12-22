export class LoginPage {


  constructor(page) {

    this.page = page;
    this.emailLoc = page.locator("#userEmail");
    this.passwordLoc = page.locator("#userPassword");
    this.loginBtn = page.locator("#login");


  }

  async goTo() {

    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  }

  async validLogin(email, password) {


    await this.emailLoc.fill(email);
    await this.passwordLoc.fill(password);
    await this.loginBtn.click();


  }
}
