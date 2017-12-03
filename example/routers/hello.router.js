import Router from 'koa-router';

export default class HelloRouter extends Router {
  constructor(injector) {
    super();
    this.name = 'Hello router';  // optional if not define will be used file name"
    this.rootPath = null; // optional by default will be using first part of the file name
    this.helloController = this.injector.get('helloCustomName');
  }

  load() {
    this.get('/', this.helloController.getHello.bind(this.helloController)); // TODO fix binding
    this.get('/by', this.helloController.sayBy.bind(this.helloController)); // TODO fix binding
    return this;
  }
};
