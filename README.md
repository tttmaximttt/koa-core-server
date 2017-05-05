# KOA-CORE-SERVER
The koa server wrapper.
---

### SETUP
* npm install --save koa-core-server

### HOW TO USE
* server initialization
```javascript
import Server from 'koa-core-server';
import path from 'path';

const routePath = path.join(__dirname, 'routers'); // path to you {name}.route.js
const controllersPath= path.join(__dirname, 'controllers'); // path to you {name}.controller.js
const server = new Server({
  routePath,
  controllersPath,
});

server.start();
```

* router
```javascript
import Router from 'koa-router';

export default class ExampleRouterClass extends Router {
  constructor() {
    super();
    this.name = 'Hello router';  // optional if not define will be used file name"
    this.rootPath = null; // optional by default will be using first part of the file name
    this.helloController = this.injector.get('helloCustomName');
  }

  load() {
    this.get('/', this.helloController.getHello.bind(this.helloController));
    this.get('/by', this.helloController.sayBy.bind(this.helloController));
    return this;
  }
};
```

* controller
```javascript
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
```
[server example](https://github.com/tttmaximttt/koa-core-server/tree/master/example)
-----------

# TODO
* add load packages from yarn
* fix duplicate logic in loaders
* add only read preferences to injectors 
* add tests
* add auto publish via some CI by master hook
