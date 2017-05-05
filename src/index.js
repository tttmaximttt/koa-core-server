import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import RouterLoader from './blueprints/router.loader';
import ControllerLoader from './blueprints/controller.loader';
import DataAccessLoader from './blueprints/dataAccess.loader';
import Injector from './blueprints/injector';

export default class Server extends Koa {
  constructor(options) {
    super();
    this.options = options;
    this.use(logger());
    this.controllerInjector = new Injector();
    this.dataAccessInjector = new Injector();
  }

  init() {
    // DATA ACCESS LOADING
    this._loadDataAccess();
    // CONTROLLER LOADING
    this._loadControllers();
    // ROUTE LOADING
    this._loadRoutes();
  }

  start() {
    this.init();
    this.listen(3000, () => {
      console.log('listening at 3000');
    });
  }

  _loadDataAccess() {
    const dataAccessLoader = new DataAccessLoader(path.resolve(this.options.dataAccessPath));
    dataAccessLoader.load(this.dataAccessInjector);
  }

  _loadControllers() {
    const controllerLoader = new ControllerLoader(path.resolve(this.options.controllersPath), this.dataAccessInjector);
    controllerLoader.load(this.controllerInjector);
  }

  _loadRoutes() {
    const routeLoader = new RouterLoader(path.resolve(this.options.routePath), this.controllerInjector);
    const routers = routeLoader.load();
    routers.forEach((router) => {
      this.use(router);
    });
  }
}