module.exports = class HelloDataAccess {
  getHello() {
    return Promise.resolve('hellos');
  }

  getGoodBy() {
    return Promise.resolve('good bydd');
  }
};
