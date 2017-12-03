import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import RouterLoader from './loaders/router.loader';
import ControllerLoader from './loaders/controller.loader';
import DataAccessLoader from './loaders/dataAccess.loader';
import Injector from './blueprints/injector';
import cluster from 'cluster';
import os from 'os';

export default class Server extends Koa {
  constructor(options = {}) {
    super();
    this.options = options;
    this.use(logger());
    this.port = process.env['PORT'] || 3000;

    this.on('error', (err, ctx) => {
      console.error('server error', err, ctx)
    });

    global.loadersStatus = this.options.loadersStatus;
  }

  _init() {
    // DATA ACCESS LOADING
    const dataAccessInjector = this._loadDataAccess();
    // CONTROLLER LOADING
    const controllerInjector = this._loadControllers(dataAccessInjector);
    // ROUTE LOADING
    this._loadRoutes(controllerInjector);
    return this;
  }

  start() {
    this._init()
      ._boot(this.options.clustering);
  }

  _boot(clustering = false) {
    if(cluster.isMaster && (this.env === 'production' || clustering)) {
      const numWorkers = os.cpus().length;
      console.log(`Master cluster setting up ${numWorkers} workers...`);

      for(let i = 0; i < numWorkers; i++) {
        cluster.fork();
      }

      cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
      });

      cluster.on('exit', function(worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
      });
    } else {
      this.listen(this.port, () => {
        console.log(`listening at ${this.port}`);
      });
    }
  }

  _loadDataAccess() {
    const dataAccessLoader = new DataAccessLoader(path.resolve(this.options.dataAccessPath));
    return dataAccessLoader.load(new Injector());
  }

  _loadControllers(dataAccessInjector) {
    const controllerLoader = new ControllerLoader(path.resolve(this.options.controllersPath), dataAccessInjector);
    return controllerLoader.load(new Injector());
  }

  _loadRoutes(controllerInjector) {
    const routeLoader = new RouterLoader(path.resolve(this.options.routePath), controllerInjector);
    const routers = routeLoader.load();
    routers.forEach((router) => {
      this.use(router);
    });
  }
}
