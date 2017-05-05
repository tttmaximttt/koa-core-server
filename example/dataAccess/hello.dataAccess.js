export default class HelloDataAccess {
  getHello() {
    return Promise.resolve('hello');
  }

  getGoodBy() {
    return Promise.resolve('good by');
  }
}