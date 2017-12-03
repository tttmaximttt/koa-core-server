module.exports = class UserController {
  constructor() {
    this.userData = this.injector.get('userData');
  }

  async sayHello(ctx, next) {
    ctx.response.body = await this.userData.getHello('Maksym');
  }

  async sayBy(ctx, next) {
    ctx.response.body = await this.userData.getGoodBy('Maksym');
  }
};
