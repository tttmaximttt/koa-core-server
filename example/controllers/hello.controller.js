export default class HelloController {
  constructor() {
    this.name = 'helloCustomName'; // optional if not define will be using file name in "helloController" format
    this.helloDataAccess = this.injector.get('helloDataAccess');
  }

  async getHello(ctx, next) {
    ctx.response.body = await this.helloDataAccess.getHello();
  }

  async sayBy(ctx, next) {
    ctx.response.body = await this.helloDataAccess.getGoodBy();
  }
}
