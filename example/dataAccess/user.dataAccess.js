module.exports = class UserDataAccess {
  constructor() {
    this.name = 'userData';
  }

  getGoodBy(name) {
    return Promise.resolve(`good by from user ${name}`);
  }
  getHello(name) {
    return Promise.resolve(`hello from user ${name}`);
  }
};
