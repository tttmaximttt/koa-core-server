import glob from 'glob';
import path from 'path';

export default class RouteLoader {
  static buildPrefix(filaneme) {
    return filaneme.split('.')[0];
  }

  constructor(routeDir, controllerInjector) {
    this.routeDir = routeDir;
    this.controllerInjector = controllerInjector;
    this.routeInstance = null;
    this.stack = [];
  }

  _bindRoutes(fileName) {
    const prefixFromFile = RouteLoader.buildPrefix(fileName);
    const prefix = this.routeInstance.rootPath || `/${prefixFromFile}`;
    this.routeInstance.prefix(prefix);
    this.routeInstance.use(this.routeInstance.load().routes());
    this.routeInstance.use(this.routeInstance.load().allowedMethods());
    this.stack.push(this.routeInstance.routes());
    console.log(`Router "${prefix.replace('/', '')}" load successful`);
    this.routeInstance = null;
  }

  load() {
    const routFiles = glob.sync(`${this.routeDir}/**/*.router.js`);
    for (const file of routFiles) {
      const RouteClass = require(file).default;
      RouteClass.prototype.injector = this.controllerInjector;
      const fileName = path.basename(file);
      this.routeInstance = new RouteClass();
      this._bindRoutes(fileName);
    }

    return this.stack;
  }
}