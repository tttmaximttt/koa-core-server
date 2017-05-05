export default class UserController {
  constructor() {
    this.injector = UserController.prototype.injector;
    this.userData = this.injector.get('userData');
  }

  async sayHello(ctx, next) {
    ctx.response.body = await this.userData.getHello('Maksym');
  }

  async sayBy(ctx, next) {
    ctx.response.body = await this.userData.getGoodBy('Maksym');
  }
}