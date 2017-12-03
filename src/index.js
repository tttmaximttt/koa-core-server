import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import RouterLoader from './loaders/router.loader';
import ControllerLoader from './loaders/controller.loader';
import DataAccessLoader from './loaders/dataAccess.loader';
import Injector from './blueprints/injector';

export default class Server extends Koa {
  constructor(options) {
    super();
    this.options = options;
    this.use(logger());
    this.port = process.env['PORT'] || 3000;
  }

  init() {
    // DATA ACCESS LOADING
    const dataAccessInjector = this._loadDataAccess();
    // CONTROLLER LOADING
    const controllerInjector = this._loadControllers(dataAccessInjector);
    // ROUTE LOADING
    this._loadRoutes(controllerInjector);
  }

  start() {
    this.init();
    this.listen(this.port, () => {
      console.log(`listening at ${this.port}`);
    });
  }

  _loadDataAccess() {
    const dataAccessInjector = new Injector();
    const dataAccessLoader = new DataAccessLoader(path.resolve(this.options.dataAccessPath));
    dataAccessLoader.load(dataAccessInjector);
    return dataAccessInjector;
  }

  _loadControllers(dataAccessInjector) {
    const controllerInjector = new Injector();
    const controllerLoader = new ControllerLoader(path.resolve(this.options.controllersPath), dataAccessInjector);
    controllerLoader.load(controllerInjector);
    return controllerInjector;
  }

  _loadRoutes(controllerInjector) {
    const routeLoader = new RouterLoader(path.resolve(this.options.routePath), controllerInjector);
    const routers = routeLoader.load();
    routers.forEach((router) => {
      this.use(router);
    });
  }
}
