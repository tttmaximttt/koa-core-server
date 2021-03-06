const Router = require('koa-router');

module.exports = class UserRouter extends Router {
  constructor() {
    super();
    this.name = 'User router';  // optional if not define will be used file name"
    this.rootPath = null; // optional by default will be using first part of the file name
    this.userController = this.injector.get('userController');
  }

  load() {
    this.get('/hello', this.userController.sayHello.bind(this.userController)); // TODO fix binding
    this.get('/by', this.userController.sayBy.bind(this.userController)); // TODO fix binding
    return this;
  }
};
