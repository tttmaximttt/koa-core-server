import glob from 'glob';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

export default class RouteLoader {
  static buildPrefix(filaneme) {
    return filaneme.split('.')[0];
  }

  constructor(routeDir, injector) {
    this.routeDir = routeDir;
    this.injector = injector;
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
    loadersStatus && console.log(`Router "${prefix.replace('/', '')}" load successful`);
    this.routeInstance = null;
  }

  load() {
    const routFiles = glob.sync(`${this.routeDir}/**/*.router.js`);

    if (!routFiles.length) {
      throw new Error('No routes to load');
    }

    for (const file of routFiles) {
      let RouteClass = require(file);

      if (RouteClass.default) {
        RouteClass = RouteClass.default;
      }

      RouteClass.prototype.injector = this.injector;
      const fileName = path.basename(file);
      this.routeInstance = new RouteClass();
      this._bindRoutes(fileName);
    }

    return this.stack;
  }
}
