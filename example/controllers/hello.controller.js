export default class HelloController {
  constructor() {
    this.name = 'helloCustomName'; // optional if not define will be using file name in "helloController" format
  }

  async getHello(ctx, next) {
    ctx.response.body = 'hello';
  }

  async sayBy(ctx, next) {
    ctx.response.body = 'good by';
  }
}