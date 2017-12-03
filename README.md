# KOA-CORE-SERVER
The koa server wrapper. That's all what you need to start build koa based server.
---

### SETUP
* npm install --save koa-core-server

### HOW TO USE
* server initialization
```javascript
const Server = require('koa-core-server'); // Path to koa-core in node_modules
const path = require('path');

const routePath = path.join(__dirname, 'routers'); // dir where you routers live
const controllersPath = path.join(__dirname, 'controllers'); // dir where you controllers live
const dataAccessPath = path.join(__dirname, 'dataAccess'); // dir where you data access live
const server = new Server({
  routePath,
  controllersPath,
  dataAccessPath,
  clustering: {bool}, // by default is false, run you app with workers
  loadersStatus: {bool}, // by default false, show loader statuses
});

server.use((ctx, next) => { // that how you can connect you middleware
  console.log('hello from middleware');
  next();
});

server.start();
```

* router
```javascript
const Router = require('koa-router');

module.exports = class HelloRouter extends Router {
  constructor() {
    super();
    this.name = 'Hello router';  // optional if not define will be used file name"
    this.rootPath = null; // optional by default will be using first part of the file name `hello.router -> /hello`
    this.helloController = this.injector.get('helloCustomName'); // get controller from injector controller name defining in controller class via 
    //  `this.name` or if not define use controller file name with postfix in camel case notation `user.controller -> userController`
  }

  load() {
    this.get('/', this.helloController.getHello.bind(this.helloController)); // define you routers here
    this.get('/by', this.helloController.sayBy.bind(this.helloController)); // define you routers here
    return this; // return this is required in `this` lives you routers
  }
};
```

* controller
```javascript
module.exports = class HelloController {
  constructor() {
    this.name = 'helloCustomName'; // controller name will be set in controller injector and you can find controller by this name in injector or use 
    // controller file name with postfix in camel case notation `user.controller -> userController`
    this.helloDataAccess = this.injector.get('helloDataAccess'); // get  you data access for this controller by name defining in data access class `this.name` or use file name in camel case notation with postfix `hello.dataAccess -> helloDataAccess` 
  }

  async getHello(ctx, next) { // controller methods uses in routers should be defined like plain koa function with async and ctx and next like parameters
    ctx.response.body = await this.helloDataAccess.getHello();
  }

  async sayBy(ctx, next) { // controller methods uses in routers should be defined like plain koa function with async and ctx and next like parameters
    ctx.response.body = await this.helloDataAccess.getGoodBy();
  }
}

```

* dataAccess
```javascript
module.exports = class HelloDataAccess {
  getHello() { // this methods will be using in controller
    return Promise.resolve('hello');
  }

  getGoodBy() { // this methods will be using in controller
    return Promise.resolve('good by');
  }
}
```
 For more detailed example look at [server example](https://github.com/tttmaximttt/koa-core-server/tree/master/example)
-----------

# TODO
* add load packages from yarn
* add only read preferences to injectors 
* add tests
* add auto publish via some CI by master hook
