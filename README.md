# KOA-CORE-SERVER
The koa server wrapper.
---

### SETUP
* npm install --save koa-core-server

### HOW TO USE
* server initialization
```javascript
import Server from '../src'; // Path to koa-core in node_modules
import path from 'path';

const routePath = path.join(__dirname, 'routers');
const controllersPath = path.join(__dirname, 'controllers');
const dataAccessPath = path.join(__dirname, 'dataAccess');
const server = new Server({
  routePath,
  controllersPath,
  dataAccessPath,
});

server.start();
```

* router
```javascript
import Router from 'koa-router';

export default class HelloRouter extends Router {
  constructor() {
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
```

* controller
```javascript
export default class HelloController {
  constructor() {
    this.name = 'helloCustomName'; // optional if not define will be using file name in "helloController" format
    this.injector = HelloController.prototype.injector;
    this.helloDataAccess = this.injector.get('helloDataAccess');
  }

  async getHello(ctx, next) {
    ctx.response.body = await this.helloDataAccess.getHello();
  }

  async sayBy(ctx, next) {
    ctx.response.body = await this.helloDataAccess.getGoodBy();
  }
}

```

* dataAccess
```javascript
export default class HelloDataAccess {
  getHello() {
    return Promise.resolve('hello');
  }

  getGoodBy() {
    return Promise.resolve('good by');
  }
}
```
[server example](https://github.com/tttmaximttt/koa-core-server/tree/master/example)
-----------

# TODO
* add load packages from yarn
* fix duplicate logic in loaders
* add only read preferences to injectors 
* add tests
* add auto publish via some CI by master hook
