export class ApiUtils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayLoad }
    );

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayLoad) {

    let response = {}
    response.token = await this.getToken()
    const createOrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          'Authorization': response.token,
          'Content-Type': 'application/json'
        }
      }
    );

    const createOrderJson = await createOrderResponse.json();
    console.log(createOrderJson);
    const orderID = createOrderJson.orders[0];
    console.log(orderID);
    response.orderID = orderID 
    return response   ;
  }
}
