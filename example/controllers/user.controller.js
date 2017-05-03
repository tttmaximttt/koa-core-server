export default class UserController {
  async sayHello(ctx, next) {
    ctx.response.body = 'user say hello';
  }

  async sayBy(ctx, next) {
    ctx.response.body = 'user say good by';
  }
}